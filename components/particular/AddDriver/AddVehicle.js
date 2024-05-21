import React, { useState , useEffect, useContext} from 'react';
import { View,  StyleSheet, Text, Image, Dimensions } from 'react-native';
import {Button, TextInput} from 'react-native-paper'
import {colors} from '../../../assets/styles/colors'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../../contextes/appContext';


const   setData = async (dataKey,val)=> {
  try {
     await AsyncStorage.setItem(dataKey , JSON.stringify(val))
  } catch (error) {
    alert("Une erreur s'est produite")
  }
}
const AddVehicle = ({goBack}) => {
  const {globalState , setGlobalState }= useContext(MyContext)
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insurerName, setInsurerName] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [insuranceValidity, setInsuranceValidity] = useState('');
  const [insurancePDF, setInsurancePDF] = useState('');
  const [lastTechnicalVisitDate, setLastTechnicalVisitDate] = useState('');
  const [technicalVisitPDF, setTechnicalVisitPDF] = useState('');
  const [selectedImages, setSelectedImages] = useState({image1:null , image2:null , image3:null , image4:null});
const [windowWidth, setWindowWidth] = useState(0);

const selectImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
        setSelectedImages(prevState=>({
          ...prevState,
          ['image'+index]: result.assets[0].uri
        }))
    } else {
      alert('You did not select any image.');
    }
  };

const selectTechnicalVisitPDF = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Sélectionnez le type de fichier
        copyToCacheDirectory: false,
      });

      if (document.type === 'success') {
        setTechnicalVisitPDF(document.uri); // Stockez le chemin du fichier PDF sélectionné
      }
    } catch (error) {
      // console.log('Error selecting PDF:', error);
    }
  };


  useEffect(() => {
    const getScreenWidth = async () => {
      try {
        const { width } =  Dimensions.get('window');
        setWindowWidth(width);
      } catch (error) {
        console.error('Error getting screen width: ', error);
      }
    };
    const deleteData = async ()=>{
      try {
        await AsyncStorage.removeItem('myVehicle')
      } catch (error) {
        
      }
    }
     const getData =async ()=>{
       const stringData = await AsyncStorage.getItem('myVehicle1')
        //  console.log(stringData)

       if (stringData!==null) {
         const data = JSON.parse(stringData) 
         setVehicleName(data.vehicleName)
         setModel(data.model)
         setRegistrationNumber(data.registrationNumber)
         setInsurerName(data.insurerName)
         setInsuranceNumber(data.insuranceNumber)
         setInsuranceValidity(data.insuranceValidity)
         setInsurancePDF(data.insurancePDF)
         setLastTechnicalVisitDate(data.lastTechnicalVisitDate)
         setTechnicalVisitPDF(data.technicalVisitPDF)
         setSelectedImages(data.selectedImages)
        // console.log(data)
       }
     }
    getScreenWidth();
    getData()
    deleteData()
  }, []);
  const myVehicle = {
    vehicleName: vehicleName,
    model: model,
    registrationNumber: registrationNumber,
    insurerName: insurerName,
    insuranceNumber: insuranceNumber,
    insuranceValidity: insuranceValidity,
    insurancePDF: insurancePDF,
    lastTechnicalVisitDate: lastTechnicalVisitDate,
    technicalVisitPDF: technicalVisitPDF,
    selectedImages: selectedImages,
  }
const handleSave = async ()=>{
   try {
     const dataString1 = await AsyncStorage.getItem('myVehicle1')
      const dataString2 = await AsyncStorage.getItem('myVehicle2')
   const dataString3 = await AsyncStorage.getItem('myVehicle3')

   if (dataString1===null) {
       setData('myVehicle1' , myVehicle)
       setData('myVehicle' , {vehicle1: myVehicle})
       setGlobalState(prevState =>({
        ...prevState, 
        vehicle:  {vehicle1: myVehicle}
       }))
      //  console.log( {vehicle1: myVehicle})
            goBack()

   }else if (dataString2===null) {
      setData('myVehicle2' , myVehicle)
      const vehicle1 = JSON.parse(dataString1)
      setData('myVehicle' , {vehicle1: vehicle1 , vehicle2: myVehicle})
        setGlobalState(prevState =>({
        ...prevState, 
        vehicle: {vehicle1: vehicle1 , vehicle2: myVehicle}
       }))
         goBack()
      //  console.log({vehicle1: vehicle1 , vehicle2: myVehicle})

    }else if (dataString3===null)  {
        setData('myVehicle3' , myVehicle)
        const vehicle1 = JSON.parse(dataString1)
        const vehicle2 = JSON.parse(dataString2)
      setData('myVehicle' , {vehicle1: vehicle1 , vehicle2: vehicle2 , vehicle3: myVehicle})

        setGlobalState(prevState =>({
        ...prevState, 
        vehicle:  {vehicle1: vehicle1 , vehicle2: vehicle2 , vehicle3: myVehicle}
       }))
     goBack()
    // console.log('Mes vehicules' ,  {vehicle1: vehicle1 , vehicle2: vehicle2 , vehicle3: myVehicle})
    }else{
         const vehicle1 = JSON.parse(dataString1)
        const vehicle2 = JSON.parse(dataString2)
        const vehicle3 = JSON.parse(dataString3)

        setGlobalState(prevState =>({
        ...prevState, 
        vehicle:  {vehicle1: vehicle1 , vehicle2: vehicle2 , vehicle3: vehicle3}
       }))
            goBack()

    }

   } catch (error) {
    
   }
}
 return (
    <View>
      <TextInput
              style={styles.input}

        label="Nom officiel du véhicule"
        value={vehicleName}
        onChangeText={setVehicleName}
      />
      <TextInput
              style={styles.input}

        label="Modèle"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
              style={styles.input}

        label="Numéro de carte grise"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
              style={styles.input}

        label="Nom de l'assureur"
        value={insurerName}
        onChangeText={setInsurerName}
      />
      <TextInput
              style={styles.input}

        label="Numéro d'assurance"
        value={insuranceNumber}
        onChangeText={setInsuranceNumber}
      />
      <TextInput
              style={styles.input}

        label="Validité de l'assurance"
        value={insuranceValidity}
        onChangeText={setInsuranceValidity}
      />
      <TextInput
              style={styles.input}

        label="Pdf de l'assurance"
        value={insurancePDF}
        onChangeText={setInsurancePDF}
      />
      <TextInput
              style={styles.input}

        label="Date de la dernière visite technique"
        value={lastTechnicalVisitDate}
        onChangeText={setLastTechnicalVisitDate}
      />
     
      <Button onPress={selectTechnicalVisitPDF} style={styles.button}>
        <Text style={styles.btnTextStyle}>Sélectionner PDF de la visite technique</Text>
      </Button>

       <Button onPress={()=>selectImage(1)} style={styles.button}>
         <Text style={styles.btnTextStyle}>Ajouter Photo arrière du véhicule</Text>
      </Button>
       <Button  onPress={()=>selectImage(2)} style={styles.button}>
         <Text style={styles.btnTextStyle}>Ajouter la photo intérieur du véhicule </Text>
      </Button>
       <Button  onPress={()=>selectImage(3)} style={styles.button}>
         <Text style={styles.btnTextStyle}>Ajouter la photo côté du véhicule </Text>
      </Button>
       <Button  onPress={()=>selectImage(4)} style={styles.button}>
        <Text style={styles.btnTextStyle}>Ajouter la photo avant du véhicule </Text>
      </Button>
      <Button  onPress={()=>handleSave()} style={styles.button}>
         <Text style={styles.btnTextStyle}>Enrégistrer </Text>
      </Button>
    </View>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
    input: {
    marginVertical: 5,
     width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: '#333',
    backgroundColor: 'white',
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
  btnTextStyle:{
    color:'white'
  }, 
    image: {
    height: 200,
    marginTop: 20,
  },
});

