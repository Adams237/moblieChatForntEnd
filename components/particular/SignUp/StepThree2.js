// Importez les composants et modules nécessaires
import React  , {useState , useContext} from 'react';


import { View, StyleSheet , Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepThree2 = () => {
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [cniNumber, setCniNumber] = React.useState('');
  const [permiNumber , setPermiNumber] = useState()
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const {globalState , setGlobalState} = useContext(MyContext)
  const [username , setUsername] =useState('')
  const [cniValidDate , setCniValidDate]= useState()
   const [permiValidDate , setPermiValidDate] = useState()
  const handleRegister = async () => {
  try {
      // Récupérer les données précédemment stockées dans AsyncStorage
      const formDataString = await AsyncStorage.getItem('driverDataB');
      const formData = JSON.parse(formDataString);
      alert(formDataString)

      // Ajouter les nouvelles données à l'objet existant
      formData.fullName = fullName;
      formData.username= username
      formData.phoneNumber = phoneNumber
      formData.password = password;
      formData.confirmPassword = confirmPassword;
       formData.cniNumber = cniNumber ;
       formData.cniValidDate = cniValidDate;
       formData.permiNumber = permiNumber
       formData.permiValidDate = permiValidDate
      // Stocker les données mises à jour
      await AsyncStorage.setItem('driverDataB', JSON.stringify(formData));

      // Autres actions de connexion...
      setGlobalState(prevState => ({
        ...prevState,
        connecting: true,
      }));

      setTimeout(() => {
        setGlobalState(prevState => ({
          ...prevState,
          connected: true,
        }));
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  };
  

  return (
    <View style={styles.container}>
       <TextInput
        label="Nom d'utilisateur"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Noms et prénoms"
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        label="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
       <TextInput
        label="Numéro de la CNI"
        value={cniNumber}
        onChangeText={text => setCniNumber(text)}
      />
       <TextInput
        label="Date d'expiration de la CNI"
        value={cniValidDate}
        onChangeText={text => setCniValidDate(text)}
      />
       <TextInput
        label="Numéro de permis de conduite"
        value={permiNumber}
        onChangeText={text => setPermiNumber(text)}
      />
       <TextInput
        label="Date d'expiration de la CNI"
        value={permiValidDate}
        onChangeText={text => setPermiValidDate(text)}
      />
      <TextInput
        label="Créer mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Confirmer mot de passe"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister}>
          <Text style={{color: 'white'}}>
             Créer mon compte
      </Text>
      </Button>
    </View>
  );
};

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

// Exportez le composant
export default StepThree2;


