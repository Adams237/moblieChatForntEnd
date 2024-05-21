import React from 'react';
import { View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import NotificationItem from '../components/particular/NotificationItem';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect } from '@react-navigation/native';
import RideItem from '../components/particular/RideItem';

enableScreens();
const historyRides = [
  { id: '1', text: 'En route vers l\'École des Beaux-Arts de Douala depuis Bonamoussadi', date: '10/24/2023' },
  { id: '2', text: 'En cours de trajet de Nlongkak vers le Lycée Bilingue de Yaoundé', date: '10/23/2023' },
  { id: '3', text: 'Départ de Makepe pour se rendre à l\'Université de Douala', date: '10/22/2023' },
  { id: '4', text: 'Déplacement de Nkolndongo vers l\'École Publique de Bastos', date: '10/21/2023' },
  { id: '5', text: 'En route de Biyem-Assi à l\'École Nationale d\'Administration et de Magistrature', date: '10/20/2023' },
  // Ajoutez d'autres déplacements ici avec des lieux réels
];


const RidesScreen = ({user}) => {
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
        data={historyRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RideItem icon={'location'} text={item.text} date={item.date} />}
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

export default RidesScreen;
