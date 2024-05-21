import React from 'react';
import { View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import HistoTransItem from '../../../components/particular/HistoTransItem';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect } from '@react-navigation/native';

enableScreens();

const transactions = [
  { id: '1', text: 'Vous avez effectué un paiement', date: '10/24/2023' },
  { id: '3', text: 'Votre publication a reçu un nouveau commentaire', date: '10/22/2023' },
  { id: '4', text: 'Quelqu\'un a aimé votre photo', date: '10/21/2023' },
  { id: '5', text: 'Vous avez été mentionné dans un commentaire', date: '10/20/2023' },
  { id: '1', text: 'Nouvelle transaction reçue', date: '10/24/2023' },
  { id: '3', text: 'Votre transaction a été approuvée', date: '10/22/2023' },
  { id: '4', text: 'Vous avez reçu un paiement', date: '10/21/2023' },
  { id: '5', text: 'Transaction en attente de confirmation', date: '10/20/2023' },
  { id: '1', text: 'Nouvelle transaction reçue', date: '10/24/2023' },
  { id: '3', text: 'Transaction annulée', date: '10/22/2023' },
  { id: '4', text: 'Paiement confirmé', date: '10/21/2023' },
  { id: '5', text: 'Remboursement traité', date: '10/20/2023' },
];

const Historique = () => {
  const positionX = React.useRef(new Animated.Value(1000)).current;

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = {
    transform: [{ translateX: positionX }],
  };

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(positionX, {
        toValue: 0,
        duration: config.duration,
        easing: config.easing,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(positionX, {
          toValue: 1000,
          duration: config.duration,
          easing: config.easing,
          useNativeDriver: true,
        }).start();
      };
    }, [positionX, config])
  );

  return (
    <Animated.View style={[styles.container, style]}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoTransItem text={item.text} date={item.date} icon='cash'/>}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default Historique;
