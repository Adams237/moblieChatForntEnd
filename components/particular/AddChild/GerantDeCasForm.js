import React, { useState, useContext } from 'react';
import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MySlide from '../../general/MySlide';
import MyContext from '../../../contextes/appContext';
import * as ImagePicker from 'expo-image-picker';
import {colors} from '../../../assets/styles/colors'

const Form = () => {
  const { globalState, setGlobalState } = useContext(MyContext);
  const [nom, setNom] = useState('');
  const [sexe, setSexe] = useState('');
  const [numeroCNI, setNumeroCNI] = useState('');
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    // Ajoutez ici la logique pour enregistrer les données
    // console.log('Données sauvegardées : ', nom, sexe, numeroCNI, photo);
    navigation.navigate('Choisir vos préférences');
   
  };



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

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom et Prénom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />
      <TextInput label="Sexe" value={sexe} onChangeText={setSexe} style={styles.input} />
      <TextInput
        label="Numéro de CNI"
        value={numeroCNI}
        onChangeText={setNumeroCNI}
        style={styles.input}
      />
     <Button mode="contained" onPress={handleChoosePhoto} style={[styles.button, styles.input]}>
       <Text style={{color: 'white'}}>
         Choisir une photo
       </Text>
    </Button>
    <Button mode="contained" onPress={handleSave} style={[styles.button, styles.input]}>
           <Text style={{color: 'white'}}>
             Suivant
             </Text>

    </Button>
    </View>
  );
};

const GerantDeCasForm = () => {
  const { globalState, setGlobalState } = useContext(MyContext);

  return <Form />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
        color: 'white'

  },
});

export default GerantDeCasForm;
