import React, { useState , useEffect , useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity, Image } from 'react-native';
import { Card, Avatar , Button , Title} from 'react-native-paper';
import AddDriver from '../components/particular/AddDriver/AddDriver'
import AddVehicle from '../components/particular/AddDriver/AddVehicle'
import ModalContainer from '../components/general/ModalContainer';
import AppBarr from '../components/general/AppBarr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../contextes/appContext';

const FleetScreen = ({user}) => {
  const [drivers, setDrivers] = useState([]);
  const [isVehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [isDriverModalVisible, setDriverModalVisible] = useState(false);
   const {globalState , setGlobalState} = useContext(MyContext)
  const toggleVehicleModal = () => setVehicleModalVisible(!isVehicleModalVisible);
  const toggleDriverModal = () => setDriverModalVisible(!isDriverModalVisible);

  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const [driverName, setDriverName] = useState('');

  const addVehicle = () => {
    const newVehicle = { name: vehicleName, type: vehicleType };
    setVehicles([...vehicles, newVehicle]);
    setVehicleName('');
    setVehicleType('');
    setVehicleModalVisible(false);
  };

  const addDriver = () => {
    const newDriver = { name: driverName };
    setDrivers([...drivers, newDriver]);
    setDriverName('');
    setDriverModalVisible(false);
  };

let vehicles = [

];
useEffect(()=>{
   const getData =async ()=>{
       const stringData = await AsyncStorage.getItem('myVehicle')
        //  console.log(stringData)

       if (stringData!==null) {
         const data = JSON.parse(stringData) 

         vehicles =   Object.entries(data).map(([id, item]) => ({ id, ...item }));   
      // console.log('vehicle',data)

          }
     }
  getData()
}, [])


       if (globalState.vehicle) {
          vehicles =   Object.entries(globalState.vehicle).map(([id, item]) => ({ id, ...item })); 
       }
  return (
    <View style={styles.container}>
        {
          vehicles.length>0 ?   <ScrollView>
      <Title style={{textAlign: 'center'}}>Mes véhicules</Title>
        {vehicles.map((item, index) => (
     <TouchableOpacity style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.selectedImages.image1 }} />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.vehicleName}>{item.vehicleName}</Text>
          <Text style={styles.registrationNumber}>{item.registrationNumber}</Text>
          <Button
            mode="contained"
            onPress={() => toggleDriverModal()}
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
          >
           <Text style={{color: 'white'}}>
             Ajouter un chauffeur
           </Text>
          </Button>
        </Card.Content>
      </Card>
    </TouchableOpacity>
        ))}
      </ScrollView>:<View>
        <Text>
          Aucun véhicule ajouté 
        </Text>

      </View>
        }

      <TouchableOpacity style={styles.floatingButton} onPress={toggleVehicleModal}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={isVehicleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleVehicleModal}
      >
          <AppBarr title={'Ajouter un véhicule '} goBack={()=>setVehicleModalVisible(false)}></AppBarr>
       <ModalContainer children={<AddVehicle  goBack={()=>setVehicleModalVisible(false)}/>
}/>
      </Modal>

      <Modal
        visible={isDriverModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDriverModal}
      >
        <AppBarr title={'Ajouter un chauffeur '} goBack={()=>setDriverModalVisible(false)}></AppBarr>
       <ModalContainer children={<AddDriver />
}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
   cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  registrationNumber: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 16,
    borderRadius: 4,
    paddingVertical: 2,
  },
  buttonLabel: {
    fontSize: 14,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#3498db',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 36,
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

export default FleetScreen;
