
import  React,{  useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";


import { Button, Snackbar, Title } from "react-native-paper";
import { colors } from "../assets/styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

// import { onValue, push, ref, set } from "firebase/database";
// import { db } from "../backend/firebaseConfig";

// import ParentMap from "../components/particular/Parent/Map";
import Br from "../components/widgets/br/br";
import Map from "../components/particular/Parent/Map";

const { width, height } = Dimensions.get('window');

const R2SScreen = ({ user }) => {
  const navigation = useNavigation()
  // const [isMoving, setIsMoving] = useState(false);
  const [visible, setVisible] = useState(false)
  const [enfants, setEnfants] = useState([])
  const route = useRoute()
  const { item } = route.params
  const updateEnfant = ()=>{
    setEnfants(item)
  }

  useEffect(()=>{
    updateEnfant()
  },[item])
  // console.log("user: ",user)
  // console.log("Enfant :",selectedEnfants);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      {
        enfants ? (
          <Map enfants={enfants} user={user} />
        ) :

          <View style={styles.actionsButtons}>

            <Text style={{ textAlign: 'center' }}>
              Aucun enfant selectioné pour le trajet 😞!
            </Text>
            <Br size={20} />
            <Button style={styles.signUpBtn} onPress={() => {
              navigation.navigate('Enfants', { enfants })
            }}  >
              <Text style={{ color: 'white' }}>
                Veillez choisir les enfants
              </Text>
            </Button>
          </View>

      }

      <Snackbar
        visible={visible}
        onDismiss={() => { setVisible(false) }}
        action={{
          label: 'fermer',
          onPress: () => {

          },
        }}>
        Vous venez de démarer un trajet
      </Snackbar>
    </View>
  )
};




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
    bottom: height * 0.4,
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

export default R2SScreen