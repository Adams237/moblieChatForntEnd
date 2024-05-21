import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Modal, Text, ScrollView, TouchableOpacity , FlatList} from 'react-native';
import { IconButton, List, Colors, Avatar , Title} from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import LottieView from 'lottie-react-native'; // Assurez-vous que le nom du package est correct
import {colors} from '../assets/styles/colors'
import { Ionicons } from '@expo/vector-icons';
const UrgenceScreen = ({user}) => {
  const [emergencyType, setEmergencyType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const possibilities  = [
    
     { id: 5, type: 'Retard extrême', date: '24/10/2023' },
    { id: 6, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 7, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 8, type: 'Retard extrême', date: '24/10/2023' },
    { id: 9, type: 'Absence du chauffeur', date: '25/10/2023' }
  ]

  const [emergencies, setEmergencies] = useState([
    { id: 1, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 2, type: 'Retard extrême', date: '24/10/2023' },
    { id: 3, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 4, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    
     { id: 5, type: 'Retard extrême', date: '24/10/2023' },
    { id: 6, type: 'Absence du chauffeur', date: '25/10/2023' },
    { id: 7, type: 'Maladie de l\'enfant', date: '23/10/2023' },
    { id: 8, type: 'Retard extrême', date: '24/10/2023' },
    { id: 9, type: 'Absence du chauffeur', date: '25/10/2023' }

   
  ]);

  const handleEmergencyReport = (type) => {
    setEmergencyType(type);
    setShowModal2(true);
  };

  const handleContact = (emergency) => {
    // Logic to handle contacting the driver or school
    // console.log('Contacting for emergency:', emergency);
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.emergenciesContainer}>
            
            <FlatList
          data={emergencies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <List.Item
               key={item.id.toString()}
              title={item.type}
              description={item.date}
              left={(props) => (
                <Avatar.Icon {...props} icon="alert" style={{ backgroundColor:'white' , color: Colors.red500}} />
              )}
              onPress={() => handleContact(item)}
            />
          )}
        />
      </View>
        <TouchableOpacity onPress={() => handleEmergencyReport('')} style={styles.button}>
        <Text style={[styles.buttonText , {color: 'black'}]}>Nouvelle urgence </Text>
       
      </TouchableOpacity>
      <Modal visible={showModal2} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
               {
            possibilities.map((item) => {
              return(
                <TouchableOpacity onPress={()=>setShowModal(true)}>
                  <List.Item
                  key={item.id.toString()} // Ajout de la clé unique
                  title={item.type}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="phone"
                      color={Colors.green500}
                      onPress={() => handleContact(item)}
                    />
                  )}
                />
                </TouchableOpacity>
              );
            })
          }
       
            <TouchableOpacity onPress={() => setShowModal2(false)} style={styles.modalButton}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
       <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>Rapporter une urgence</Text>
      <TextInput
        style={styles.input}
        placeholder="Type d'urgence"
        value={emergencyType}
        onChangeText={setEmergencyType}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Détails d'urgence"
        multiline
      />
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default UrgenceScreen;
