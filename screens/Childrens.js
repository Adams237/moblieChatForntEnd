// App.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import { ActivityIndicator, Divider, Title } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { colors } from '../assets/styles/colors';
import EnfantCard from '../components/items/User/Resa/EnfantCard';
import { useNavigation } from '@react-navigation/native';
import Br from '../components/widgets/br/br';
import axios from 'axios';
import { childrenApi, getChildBus } from '../utils/api';
import { ref, set } from 'firebase/database';
import { db } from '../backend/firebaseConfig';
import { Text } from 'react-native';

const ChildrenScreen = ({ user }) => {
  const [enfants, setEnfants] = useState([]);
  const [loader, setLoader] = useState(true)
  const [refreshing, setRefreshing] = useState(false);
  const [childrenSelect, setChildrenSelect] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigation = useNavigation()

  const driverId = user.id || user._id



  const getEnfants = async () => {
    console.log("ici;a");
    setLoader(true)
    setChildrenSelect([])
    try {
      if(user.ecole){
        const {data} = await axios.get(`${getChildBus}/${driverId}`)
        setEnfants(data)
        setLoader(false)
        return
      }
      // console.log(driverId)
      const { data } = await axios.get(`${childrenApi}/${driverId}`)
      setEnfants(data)
      // console.log(data)
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  useEffect(() => {
    console.log("ici   la");
    getEnfants()
  }, [])
  const handleSwitchChange = (id) => {
    let children = childrenSelect
    const enfant = enfants.find(item=>item._id === id)
    children.push(enfant)
    setChildrenSelect(children)
    const oldChild = enfants.filter(item=> item._id !== id)
    setEnfants(oldChild)
    // setEnfants((prevEnfants) =>
    //   prevEnfants.map((enfant) =>
    //     enfant.id === id ? { ...enfant, isChecked: newValue } : enfant
    //   )
    // );
  };
  const startTravel = () => {
    console.log("oco")
    let receivers = enfants.map((enfant) => (
      enfant?.parentId
    ))
     if(!receivers[0]){
      console.log("ici")
      receivers = enfants.map(enfant=>(
        enfant.ecole._id
      ))
     }
    const notification = {
      date: new Date(),
      body: ' Le chauffeur de votre enfant a commencé un trajet',
      sender: driverId,
      receivers: receivers
    }

    const dataRef = ref(db, 'notifications')

    set(dataRef, notification)
    navigation.navigate('R2S', { childrenSelect })
  }


  const handleRefresh = () => {
    getEnfants()
    setRefreshing(true)
    setScrollPosition(0)
    setRefreshing(false)
  }

  return (
    <>
      {
        loader ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={colors.primary} size={30} />
        </View> :
          <View style={{ flex: 1, marginTop: 0 }}>
            {
              childrenSelect.length > 0 && (
                <Title style={{ marginVertical: 38, textAlign: 'center' }}>Enfants à transporter </Title>

              )
            }
            <ScrollView horizontal
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            >
              {childrenSelect.map((child, index) => {
                return (
                  (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate('child-details', { child })

                      }}>
                      <Image

                        key={child?._id}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1lSk9ZYpmspvSKua-n3RJkH7xDv-ySL7xQhhQaqWwiw&s' }}
                        style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
                      />
                      <Text>
                        {child.nom}
                      </Text>
                    </TouchableOpacity>
                  )
                )
              })}
            </ScrollView>
            <ScrollView>
              {
                enfants.length > 0 && (
                  <Title style={{ marginTop: 8, textAlign: 'center' }}>Liste d'enfants</Title>

                )
              }
              {enfants.map((child) => (
                <View
                  key={child._id}>
                  <EnfantCard child={child} onSwitchChange={()=>handleSwitchChange(child._id)} />
                  <Divider />
                </View>
              ))}
              <Br size={15} />
            </ScrollView>
            <View style={{ padding: 10 }}>
              {childrenSelect?.length > 0 && <Button title={'Démarrer mon trajet'} style={{ padding: 9 }} onPress={() => {
                startTravel()
              }}>

              </Button>}
            </View>
          </View>
      }
    </>

  );


}

export default ChildrenScreen;


const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height * 0.7,
    width: width,
  },


  appBarTitle: {
    textAlign: 'center',

  },
  searchContainer: {
    paddingVertical: 10,
    marginTop: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  actionsButtons: {
    padding: 20,
    marginTop: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  searchBar: {
    width: width * 0.75
  },
  signUpBtn: {
    borderRadius: 20,
    padding: 5,
    marginVertical: 4,
    backgroundColor: colors.primary
  },
  signInBtn: {
    marginVertical: 4,

  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },
});