import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import MyContext from '../../../contextes/appContext';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../../assets/styles/colors'

const Form = () => {
  const navigation = useNavigation();

  const [ramassage, setRamassage] = useState('');
  const [depot, setDepot] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');

  const handleSave = () => {
    // Ajoutez ici la logique pour enregistrer les données
    // console.log('Données sauvegardées : ', ramassage, depot, heureDebut, heureFin);

    navigation.navigate('Enrégister le gérant de cas');
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Référence de Ramassage"
        value={ramassage}
        onChangeText={setRamassage}
        style={styles.input}
      />
      <TextInput
        label="Référence de Dépôt"
        value={depot}
        onChangeText={setDepot}
        style={styles.input}
      />
      <TextInput
        label="Heure de début des cours"
        value={heureDebut}
        onChangeText={setHeureDebut}
        style={styles.input}
      />
      <TextInput
        label="Heure de sortie des classes"
        value={heureFin}
        onChangeText={setHeureFin}
        style={styles.input}
      />
       <Button mode="contained" onPress={handleSave} style={[styles.button, styles.input]}>
              <Text style={{color: 'white'}}>
                Suivant
             </Text>

    </Button>
    </View>
  );
};

const IteConfig = () => {

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

export default IteConfig;
