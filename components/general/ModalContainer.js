import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, Image } from 'react-native';
import { Card, Avatar , Button , Title} from 'react-native-paper';


const ModalContainer = ({children}) => {
  const [drivers, setDrivers] = useState([]);
  const [isVehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [isDriverModalVisible, setDriverModalVisible] = useState(false);

  const toggleVehicleModal = () => setVehicleModalVisible(!isVehicleModalVisible);
  const toggleDriverModal = () => setDriverModalVisible(!isDriverModalVisible);



  return (
    <View style={styles.container}>
       <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
               <ScrollView horizontal={false}>
                  {children}
               </ScrollView>
           </View>
        </View>
    </View>
       
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
  padding: 10,
  borderRadius: 0,
  flex: 1,
  },

});

export default ModalContainer;
