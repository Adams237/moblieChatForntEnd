import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, TextInput, Modal, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, List, Colors, Avatar, Title } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import AppBarr from '../../general/AppBarr';
import ModalContainer from '../../general/ModalContainer';
import { push, ref } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';
const SendUrgence = ({ user, child }) => {
  console.log(user.enfants)
  const [showModal, setShowModal] = useState(false);
  const [urgence, setUrgence] = useState(null)
  const possibilities = [

    { id: 5, type: 'Retard extrême', date: '24/10/2023' },
    { id: 6, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 7, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 8, type: 'Retard extrême', date: '24/10/2023' },
    { id: 9, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 10, type: 'Autre cause', date: '25/10/2023' }

  ]

  const handleContact = (emergency) => {
    setUrgence(emergency)
  };


  const UrgenceForm = () => {

    const [emergencyType, setEmergencyType] = useState('');
    const [urgenceDetails, setUrgenceDetails] = useState('')
    useEffect(() => {
      if (urgence !== null) {
        setEmergencyType(urgence.type)

      }
    }, [])
    function sendUrgence(params) {
      let receivers
      let urgence
      if (child) {
        receivers = user.enfants[0].parentId
        if (!receivers) {
          receivers = child.ecole._id
        }
        urgence = {
          type: emergencyType,
          details: urgenceDetails,
          sender: user._id || user.id,
          date: new Date().toISOString(),
          receivers: receivers
        }

      }
      else {
        receivers = user.enfants.map((enfant) => (enfant.parentId))
        if (!receivers) {
          receivers = user.enfants.map(enfant => enfant.ecole)
        }
        console.log(receivers)
        urgence = {
          type: emergencyType,
          details: urgenceDetails,
          sender: user._id || user.id,
          date: new Date().toISOString(),
          receivers: receivers
        }
      }


      const dataRef = ref(db, 'urgences')

      push(dataRef, urgence).then(() => {
        setShowModal(false)
      })
    }
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Type d'urgence"
          value={emergencyType}
          onChangeText={(text) => {
            setEmergencyType(text)
          }}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Détails d'urgence"
          value={urgenceDetails}
          onChangeText={(text) => {
            setUrgenceDetails(text)
          }}
          multiline
        />
        <TouchableOpacity onPress={() => sendUrgence()} style={styles.modalButton}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    )
  }



  return (
    <ScrollView style={styles.container}>
      {
        possibilities.map((item) => {
          return (
            <TouchableOpacity onPress={() => {
              handleContact(item)
              setShowModal(true)

            }}>
              <List.Item
                key={item.id.toString()} // Ajout de la clé unique
                title={item.type}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="phone"
                    color={Colors.green500}

                  />
                )}
              />
            </TouchableOpacity>
          );
        })
      }




      <Modal visible={showModal} animationType="slide" transparent>
        <AppBarr title={'Rapporter une urgence'} goBack={() => { setShowModal(false) }} />
        <ModalContainer children={<UrgenceForm />} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    display: 'flex'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emergenciesContainer: {
    marginTop: 20,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 2
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  // Vous avez une propriété "animation" dans le style, mais elle n'est pas utilisée dans le composant.
});

export default SendUrgence;
