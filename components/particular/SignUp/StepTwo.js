// PrivateDriverDetailsScreen.js

import React  , {useState , useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepTwo = () => {
  const [companyName, setCompanyName] = React.useState('');
  const [immatriculation, setImmatriculation] = React.useState('');
  
    const {globalState , setGlobalState} = useContext(MyContext)
    const navigation = useNavigation()
  const handleRegister = async () => {

 try {
    // Enregistrez les données dans un objet
    const data = {
      companyName,
      immatriculation,
   
    };

    // Convertissez les données en chaîne JSON
    const jsonData = JSON.stringify(data);

    // Enregistrez les données dans AsyncStorage avec la clé 'registeredUserData'
    await AsyncStorage.setItem('driverDataA', jsonData);
    alert(jsonData)
     navigation.navigate('Créer un compte/Etape2/catégorie A')
    // Naviguez vers l'écran suivant
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données : ', error);
    alert("Une erreur s'est produite")
  }

    

     setTimeout(() => {
             navigation.navigate('Créer un compte/Etape2/catégorie A')
      }, 3000);

  }

  return (
    <View style={styles.container}>
      <TextInput
              style={styles.input}

        label="Nom de l'entreprise"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
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

export default StepTwo;
