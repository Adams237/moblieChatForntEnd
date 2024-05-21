import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const data = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
    },
  ],
};

const Graphe = () => {
  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bande: {
    
  }
});

export default Graphe;
