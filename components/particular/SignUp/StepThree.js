import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal'; // Import de la bibliothèque pour le sélecteur de pays
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyContext from '../../../contextes/appContext';
import { colors } from '../../../assets/styles/colors';

const StepThree = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { globalState, setGlobalState } = useContext(MyContext);
  const [username, setUsername] = useState('');

  const [countryCode, setCountryCode] = useState(''); // État pour stocker le code du pays
  const [country, setCountry] = useState({}); // État pour stocker les détails du pays sélectionné

  const handleRegister = async () => {
    try {
      // Récupérer les données précédemment stockées dans AsyncStorage
      const formDataString = await AsyncStorage.getItem('driverDataA');
      const formData = JSON.parse(formDataString);
      alert(formDataString)
      // Ajouter les nouvelles données à l'objet existant
      formData.fullName = fullName;
      formData.username = username;
      formData.phoneNumber = `+${country.callingCode}${phoneNumber}`; // Formatage du numéro avec l'indicatif du pays
      formData.password = password;
      formData.confirmPassword = confirmPassword;

      // Stocker les données mises à jour
      await AsyncStorage.setItem('driverDataA', JSON.stringify(formData));

      // Autres actions de connexion...
      setGlobalState((prevState) => ({
        ...prevState,
        connecting: true,
      }));

      setTimeout(() => {
        setGlobalState((prevState) => ({
          ...prevState,
          connected: true,
        }));
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  };

  const onSelectCountry = (selectedCountry) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom d'utilisateur"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        label="Noms et prénoms"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <View style={styles.phoneInputContainer}>
        {/* Sélecteur de pays pour le numéro de téléphone */}
        <CountryPicker
          withFilter
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          onSelect={onSelectCountry}
          countryCode={countryCode}
          visible={false} // Vous pouvez définir la visibilité du composant CountryPicker
        />
        {/* Champ de texte pour le numéro de téléphone */}
        <TextInput
          style={styles.phoneInput}
          label="Numéro de téléphone"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
           keyboardType={'numeric'}

        />
      </View>
      <TextInput
        label="Créer mot de passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        label="Confirmer mot de passe"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleRegister}>
        <Text style={{ color: 'white' }}>Créer mon compte</Text>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    marginLeft: 8,
  },
});

// Exportez le composant
export default StepThree;
