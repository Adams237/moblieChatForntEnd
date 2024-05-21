import  React, { useState  ,  useContext} from 'react';
import { View, StyleSheet , Text  , Picker} from 'react-native';
import { TextInput, Button   } from 'react-native-paper';
import {colors} from '../../../assets/styles/colors'
import MyContext from '../../../contextes/appContext'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import IteConfig from './IteConfig'
const schools = [
  { label: 'École Publique de Bastos', value: 'Ecole Publique de Bastos' },
  { label: 'Collège Bilingue de Biyem-Assi', value: 'Collège Bilingue de Biyem-Assi' },
  { label: 'Lycée de Ngoa-Ekellé', value: 'Lycée de Ngoa-Ekellé' },
  // Ajoutez d'autres écoles de Yaoundé ici
];
const ChildForm = () => {
  const [school, setSchool] = useState('');

  const navigation = useNavigation()
    const {globalState , setGlobalState}= useContext(MyContext)

  const [fullName, setFullName] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [pickupReference, setPickupReference] = React.useState('');
  const [profilePhoto, setProfilePhoto] = React.useState('');
 const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleFormSubmit = () => {
    // console.log('Nom(s) et Prénom(s):', fullName);
    // console.log('Niveau scolaire:', level);
    // console.log('Date de Naissance:', dateOfBirth);
    // console.log('Lieu D’habitation:', residence);
    // console.log('Référence proche de la maison:', pickupReference);
    // console.log('Photo de profil de l’enfant:', profilePhoto);
    
     setGlobalState(prevState=>({
      ...prevState, 
      isDrawerScreen: false,
      initialScreen: {
        route: "Configurer l'itinéraire", 
      }
    }))



  };

  return (
    <View style={styles.container}>

     <Picker
        label="École de l'enfant"
        value={school}
        onValueChange={(itemValue) => setSchool(itemValue)}
        style={styles.input}
      >
        {schools.map((school, index) => (
          <Picker.Item key={index} label={school.label} value={school.value} />
        ))}
      </Picker>
      <TextInput
        label="Nom(s) et Prénom(s)"
        value={fullName}
        onChangeText={text => setFullName(text)}
        style={styles.input}
      />
      <TextInput
        label="Niveau scolaire"
        value={level}
        onChangeText={text => setLevel(text)}
        style={styles.input}
      />
      <TextInput
        label="Date de Naissance (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
        style={styles.input}
      />
      <TextInput
        label="Lieu D’habitation"
        value={residence}
        onChangeText={text => setResidence(text)}
        style={styles.input}
      />
      <TextInput
        label="Référence proche de la maison"
        value={pickupReference}
        onChangeText={text => setPickupReference(text)}
        style={styles.input}
      />
     <Button mode="contained" onPress={handleChoosePhoto} style={[styles.button, styles.input]}>
       <Text style={{color: 'white'}}>
         Ajouter  une photo
       </Text>
    </Button>
      <Button mode="contained" onPress={handleFormSubmit} style={styles.button} >
         <Text style={{color: 'white'}}>
         Suivant
         </Text> 
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
   button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    color: 'white'
  },
});

export default ChildForm;
