
import React  , {useState , useContext} from 'react'

import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepTwo2 = () => {
  const [hubName, setHubName] = React.useState('');
  const [immatriculation, setImmatriculation] = React.useState('');
    const navigation= useNavigation()
    const {globalState , setGlobalState} = useContext(MyContext)

  const handleRegister = async () => {

 try {
    // Enregistrez les données dans un objet
    const data = {
      hubName,
      immatriculation,
   
    };

    // Convertissez les données en chaîne JSON
    const jsonData = JSON.stringify(data);

    // Enregistrez les données dans AsyncStorage avec la clé 'registeredUserData'
    await AsyncStorage.setItem('driverDataB', jsonData);
        alert(""+jsonData)


    // Naviguez vers l'écran suivant
    navigation.navigate('Créer un compte/Etape2/catégorie B');
  } catch (error) {
        alert("Une erreur s'est produite")

    console.error('Erreur lors de la sauvegarde des données : ', error);
  }
  
  }

  return (
    <View style={styles.container}>
      <TextInput
              style={styles.input}

        label="Nom du Hub"
        value={hubName}
        onChangeText={text => setHubName(text)}
      />
      <TextInput
              style={styles.input}

        label="Numéro d'immatriculation"
        value={immatriculation}
        onChangeText={text => setImmatriculation(text)}
                keyboardType={'numeric'}

      />
    
      <Button mode="contained" onPress={handleRegister} style={styles.button} >
      <Text style={{color: 'white'}}>
            Valider

      </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
    input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
});

export default StepTwo2;
