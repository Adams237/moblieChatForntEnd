import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Easing, ActivityIndicator } from 'react-native';
import NotificationItem from '../components/particular/NotificationItem';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect } from '@react-navigation/native';
import RideItem from '../components/particular/RideItem';
import axios from 'axios';
import { getRapport } from '../utils/api';
import Toast from 'react-native-toast-message';
import { colors } from '../assets/styles/colors';

enableScreens();
const historyRides = [
  { id: '1', text: 'En route vers l\'École des Beaux-Arts de Douala depuis Bonamoussadi', date: '10/24/2023' },
  { id: '2', text: 'En cours de trajet de Nlongkak vers le Lycée Bilingue de Yaoundé', date: '10/23/2023' },
  { id: '3', text: 'Départ de Makepe pour se rendre à l\'Université de Douala', date: '10/22/2023' },
  { id: '4', text: 'Déplacement de Nkolndongo vers l\'École Publique de Bastos', date: '10/21/2023' },
  { id: '5', text: 'En route de Biyem-Assi à l\'École Nationale d\'Administration et de Magistrature', date: '10/20/2023' },
  // Ajoutez d'autres déplacements ici avec des lieux réels
];


const RidesScreen = ({ user }) => {
  console.log(user)
  const positionX = React.useRef(new Animated.Value(1000)).current;
  const [rapports, setRaports] = useState([])
  const [isOk, setIsOk] = useState(true)

  const updateRappor = async () => {
    setIsOk(true)
    try {
      const { data } = await axios.get(`${getRapport}/${user._id}`)
      setRaports(data)
      setIsOk(false)
    } catch (error) {
      console.log(error)
      Toast.show({

      })
    }
  }

  useEffect(() => {
    updateRappor()
  }, [])

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
    <>
      {
        isOk ? <ActivityIndicator color={colors.primary} size={79} />:
        <Animated.View style={[styles.container, style]}>
          <FlatList
            data={rapports}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <RideItem icon={'location'} distance={item.distance} text={item.enfants.length} date={item.date} />}
          />
        </Animated.View>
      }
    </>

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
