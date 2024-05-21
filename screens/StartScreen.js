import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Loader from '../components/general/Loader';

const StartScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ici, vous pouvez effectuer votre chargement initial ou vos tâches asynchrones
    // Une fois que le chargement est terminé, vous pouvez changer l'état de chargement à false.
    setTimeout(() => {
      setLoading(true);
      navigation.navigate('Home') // Simulation de la fin du chargement après 3 secondes
    }, 2000);
  }, []);

  return (
    <PaperProvider>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text>Votre application est prête!</Text>
        </View>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartScreen;
