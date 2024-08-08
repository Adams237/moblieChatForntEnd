// App.js
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, FlatList, Switch, TextInput, ActivityIndicator } from 'react-native';
import { colors } from '../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { childrenApi, getChildBus, saveRapportDriver } from '../utils/api';
import { ref, set } from 'firebase/database';
import { db } from '../backend/firebaseConfig';
import { Text } from 'react-native';
import * as Location from 'expo-location'
import { decode } from '@mapbox/polyline';
import Toast from 'react-native-toast-message'
import Geolocation from "react-native-geolocation-service"

const ChildrenScreen = ({ user }) => {
  const [enfants, setEnfants] = useState([]);
  const [newChildren, setNewChildren] = useState([])
  const [loader, setLoader] = useState(true)
  const [locationDriver, setLocationDriver] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [childrenSelect, setChildrenSelect] = useState([])
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSend, setIsSend] = useState(false)
  const navigation = useNavigation()

  const driverId = user.id || user._id


  function sendMyPostion(location) {
    const dataRef = ref(db, 'locations/' + driverId);

    const data = {
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      speed: location.speed // Envoyer la vitesse à Firebase
    };
    set(dataRef, data);
  }

  const getDirection = async (startLocaion, destinationLocation) => {
    try {
      const key = "AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA"
      const { data } = await axios.get(`
      https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLocaion}
      &destinations=${destinationLocation}&units=imperial&key=${key}
      `)
      return {
        distance: data.rows[0].elements[0].distance,
        duration: data.rows[0].elements[0].duration
      }
    } catch (error) {
      console.log('err', error);
      return error
    }
  }
  const getEnfants = async () => {
    console.log("ici;a");
    setLoader(true)
    setChildrenSelect([])
    try {
      console.log("user", user.ecole)
      if (user.ecole) {
        const { data } = await axios.get(`${getChildBus}/${driverId}`)
        console.log(data.length)
        console.log("la")
        setEnfants(data)
        let receivers = data.map((enfant) => (
          enfant?.parentId
        ))
        if (!receivers[0]) {
          console.log("ici")
          receivers = data.map(enfant => (
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
        return
      }

      // console.log(driverId)

      const { data } = await axios.get(`${childrenApi}/${driverId}`)
      let receivers = data.map((enfant) => (
        enfant?.parentId
      ))
      if (!receivers[0]) {
        console.log("ici")
        receivers = data.map(enfant => (
          enfant.ecole._id
        ))
      }
      console.log(data.length)
      setEnfants(data)
      const notification = {
        date: new Date(),
        body: ' Le chauffeur de votre enfant a commencé un trajet',
        sender: driverId,
        receivers: receivers
      }

      const dataRef = ref(db, 'notifications')

      set(dataRef, notification)
      console.log("getEnfant")
      // console.log(data)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  useEffect(() => {

    getEnfants()
  }, []);
  const updateDriverPosition = async () => {
    console.log("modif")
    if (enfants.length) {
      console.log("enfant location")
      let location = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 5
      },
        async (newLocation) => {
          setLocationDriver(newLocation.coords)
          console.log("child",newLocation.coords)
          let newEnfants = []
          sendMyPostion(newLocation.coords)
          for (let i = 0; i < enfants.length; i++) {
            const points = await getDirection(`${newLocation.coords.latitude},${newLocation.coords.longitude}`,
              `${enfants[i].ramassage[0].latitude},${enfants[i].ramassage[0].lontidute}`)
            console.log("point child",points)
            enfants[i].distance = points.distance.value / 1000
            enfants[i].temps = points.duration.text
            newEnfants.push(enfants[i])
          }
          console.log("new enfant",newEnfants.length)
          setNewChildren(newEnfants.sort(function (a, b) {
            if (a.distance < b.distance) return -1
            if (a.distance > b.distance) return 1
          }))

        
            setLoader(false)


        }
        
      )
      setEnfants(newChildren)
      console.log("taille de children",newChildren.length)
    
      console.log("voici")
      return location
    }


  }
  const handleSwitchChange = (id, value) => {
    console.log(value)
    let children = childrenSelect
    let myChild = newChildren.filter(item => item._id !== id)
    let enfant = newChildren.find(item => item._id === id)
    enfant.isChecked = value
    children.push(enfant)
    myChild.push(enfant)
    setChildrenSelect(children)
    setNewChildren(myChild)
    let receivers = enfant.parentId
    if (!receivers) receivers = enfant.ecole._id
    const notification = {
      date: new Date(),
      body: "Votre enfant n'a pas été transporté",
      sender: driverId,
      receivers: receivers
    }
    const dataRef = ref(db, "notifications")
    set(dataRef, notification)
  };
  const startTravel = async () => {
    setIsSend(true)
    let distance = 0
    console.log("rapport")

    let childTransport = []
    for (let i = 0; i < newChildren.length; i++) {
      if (!newChildren[i].isChecked) {
        childTransport.push(newChildren[i])
        distance = distance + newChildren[i].distance
      }
    }
    console.log(childTransport)
    try {
      console.log("try")
      // console.log(enfants[0].ecole._id)
      await axios.post(`${saveRapportDriver}/${driverId}`, {
        enfants: childTransport,
        ecole: childTransport[0].ecole._id,
        distance: distance
      })
      let receivers = childTransport.map((enfant) => (
        enfant?.parentId
      ))
      if (!receivers[0]) {
        console.log("ici")
        receivers = childTransport.map(enfant => (
          enfant.ecole._id
        ))
      }
      const notification = {
        date: new Date(),
        body: " Votre enfant a été déposé à l'école ",
        sender: driverId,
        receivers: receivers
      }

      const dataRef = ref(db, 'notifications')

      set(dataRef, notification)
      setIsSend(false)
      alert("Mission accomplie Bonne journée!")
    } catch (error) {
      console.log(error)
      // console.log(error.response.data.message)
      Toast.show({
        type: "error",
        text1: "une erreur est survenue veillez reessayer"
      })
      setIsSend(false)
    }

  }


  const handleRefresh = () => {
    getEnfants()
    updateDriverPosition()
    setRefreshing(true)
    setScrollPosition(0)
    setRefreshing(false)
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const wachtId = await updateDriverPosition()

      return () => {
        wachtId.remove()
      }
    })()
  }, [enfants, newChildren])

  const handleSearch = (value) => {
    if (value) {
      const children = newChildren.filter(item => item.nom.toLowerCase().includes(value.toLowerCase()))
      setNewChildren(children)
      return
    }
    setNewChildren(enfants)
  }

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <TextInput
        style={styles.input}
        placeholder="Rechercher un enfant"
        onChangeText={text => handleSearch(text)}

      />
      {
        (loader) ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
          <ActivityIndicator color={colors.primary} size={100} />
        </View> :
          <View style={styles.containerChild}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>Liste des Enfants à porter</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>(Cocher l'enfant qui n'a pas été porté)</Text>

            <FlatList
              data={newChildren}
              keyExtractor={item => item._id}
              renderItem={({ item }) =>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("R2S", { item })} >
                  {  }
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('child-details', { child: item })
                  }} >
                    <Image source={{ uri: item.photo.includes("upload")? `https://r2sbackend-1.onrender.com/${item.photo} `:item.photo }} style={{
                      width: 80,
                      height: 80,
                      borderRadius: 50,
                      marginTop: 10,
                      marginLeft: 10
                    }}
                    />
                  </TouchableOpacity>

                  <View style={styles.info} >
                    <Text style={styles.nom}>{item.nom}</Text>
                    <Text style={styles.ecole}>{item.adresse}</Text>
                    <Text style={styles.ecole}>{item.ecole.nomEcole}</Text>
                    <Text style={styles.ecole}>disance :{item.distance} Km</Text>
                    <Text style={styles.ecole}>Temps :{item.temps}</Text>
                  </View>
                  <Switch value={item.isChecked} onValueChange={(value) => handleSwitchChange(item._id, value)} />

                </TouchableOpacity>
              }
            />
            <TouchableOpacity style={styles.button} onPress={startTravel} disabled={isSend}>
              {isSend ? <ActivityIndicator color="white" size={40} /> : <Text style={{ color: "white" }} > Enfants Déposés à l'école </Text>}
            </TouchableOpacity>
            <Toast
              position='top'
              bottomOffset={20}
            />
          </View>

      }
    </ScrollView>

  );


}

export default ChildrenScreen;


const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  map: {
    height: height * 0.7,
    width: width,
  },

  containerChild: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: 'white'
  },
  item: {
    width: width * 0.9,
    height: 120,
    backgroundColor: 'lightgray',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  info: {
    margin: 10
  },
  nom: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    marginBottom: 10,
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",

  },
  input: {
    margin: "auto",
    marginTop: 30,
    height: 60,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
    borderColor: colors.primary
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