import  React, { useState  ,  useContext} from 'react';
import { View, StyleSheet, ScrollView  , Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {colors} from '../../assets/styles/colors'
import MyContext from '../../contextes/appContext'
const SignUpForm = () => {



  const {globalState , setGlobalState} = useContext(MyContext)
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRegistration = () => {
  
    setGlobalState(prevState => ({
              ...prevState,
              connecting: true
       }))

       setTimeout(()=>{
          setGlobalState(prevState => ({
              ...prevState,
              connected: true
       }))
       } , 3000)
  };

  return (
    <ScrollView style={styles.container}>
      {step === 1 && (
        <>
         <TextInput
            label="Quel est le nom de votre école"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            label="Prénom"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            label="Nom"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
          <TextInput
            label="Adresse Mail"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            label="Numéro de CNI"
            value={idNumber}
            onChangeText={text => setIdNumber(text)}
            style={styles.input}
          />
          <TextInput
            label="Numéro de téléphone"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleNext} style={styles.button}>
              <Text style={{color: 'white'}}>
                 Suivant
             </Text>
          </Button>
        </>
      )}
      {step === 2 && (
        <>
          <TextInput
            label="Quartier de résidence"
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.input}
          />
          <TextInput
            label="Ville de résidence"
            value={city}
            onChangeText={text => setCity(text)}
            style={styles.input}
          />
          <TextInput
            label="Créer un mot de passe"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
          <TextInput
            label="Confirmer le mot de passe"
            value={confirmPassword}
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
            style={styles.input}
          />
          <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={handlePrevious} style={styles.button}>
             <Text style={{color: 'white'}}>
                 Précédent
             </Text>            </Button>
            <Button mode="contained" onPress={handleRegistration} style={styles.button}>
             <Text style={{color: 'white'}}>
                 Créer mon compte
             </Text>
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SignUpForm;
