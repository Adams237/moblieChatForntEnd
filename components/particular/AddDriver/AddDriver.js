import React, { useState } from 'react';
import { View, Button , StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper'
import {colors} from '../../../assets/styles/colors'
const AddDriver = () => {
  const [driverName, setDriverName] = useState('');
  const [driverCNI, setDriverCNI] = useState('');
  const [cniExpiryDate, setCniExpiryDate] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [driverPhoto, setDriverPhoto] = useState('');
  const [cniPDF, setCniPDF] = useState('');
  const [capacityCertificateNumber, setCapacityCertificateNumber] = useState('');
  const [capacityCertificatePDF, setCapacityCertificatePDF] = useState('');
  const [vehicleRegistration, setVehicleRegistration] = useState('');

  const handleSave = () => {
    // Logique pour enregistrer le chauffeur
  };

  return (
    <View>
      <TextInput
      style={styles.input}
        label="Nom du chauffeur principal"     
           value={driverName}
        onChangeText={setDriverName}
                secureTextEntry

      />
      <TextInput
            style={styles.input}

        label="Numéro de CNI"
        value={driverCNI}
        onChangeText={setDriverCNI}
      />
      <TextInput
            style={styles.input}
        label ="Date de validité de la CNI"
        value={cniExpiryDate}
        onChangeText={setCniExpiryDate}
        
      />
      <TextInput
            style={styles.input}
        label="Numéro du permis de conduire"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
      />
      <TextInput
            style={styles.input}
        label="Date de validité du permis de conduire"
        value={licenseExpiryDate}
        onChangeText={setLicenseExpiryDate}
      />
      <TextInput
            style={styles.input}

        label="Téléphone portable"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
          style={styles.input}

        label="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
            style={styles.input}

        label="Photo de profil du chauffeur"
        value={driverPhoto}
        onChangeText={setDriverPhoto}
      />
      <TextInput
            style={styles.input}

        label="Recto-verso CNI en PDF"
        value={cniPDF}
        onChangeText={setCniPDF}
        keyboardType={'file'}
      />
      <TextInput
            style={styles.input}

        label="Numéro du certificat de capacité"
        value={capacityCertificateNumber}
        onChangeText={setCapacityCertificateNumber}
        keyboardType={'number'}
      />
      <TextInput
            style={styles.input}

        label="Fichier PDF du certificat de capacité (recto-verso)"
        value={capacityCertificatePDF}
        onChangeText={setCapacityCertificatePDF}
        keyboardType={'file'}

      />
      <TextInput
        style={styles.input}
        label="Immatriculation de la voiture à charge"
        value={vehicleRegistration}
        onChangeText={setVehicleRegistration}
        secureTextEntry
      />
            <Button title="Enregistrer votre chauffeur" onPress={handleSave} style={styles.button}/>

    </View>
  );
};

export default AddDriver;

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
});

