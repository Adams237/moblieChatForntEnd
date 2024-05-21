import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import CarItem from '../../../items/User/FlotteScreen/CarItem';
import { colors } from '../../../../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';

const cars = [
  { id: 1, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 1', prix: '5000', reservations: '10' },
  { id: 2, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 2', prix: 'Prix 2', reservations: 'Nombre 2' },
  { id: 3, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 3', prix: 'Prix 3', reservations: 'Nombre 3' },
  { id: 4, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 4', prix: 'Prix 4', reservations: 'Nombre 4' },
  { id: 5, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 5', prix: 'Prix 5', reservations: 'Nombre 5' },
  { id: 6, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 6', prix: 'Prix 6', reservations: 'Nombre 6' },
  { id: 7, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 7', prix: 'Prix 7', reservations: 'Nombre 7' },
  { id: 8, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-395FbEY7q214SPwJtb28KQ5WDCJlN5g2n5iZri2Tg&s', marque: 'Marque 8', prix: 'Prix 8', reservations: 'Nombre 8' },
];

const DriversList = ({ isGrid , gridstyles }) => {
      const navigation = useNavigation()

  if (isGrid) {
    // Render as a grid
    return (
      <View style={gridstyles.gridContainer}>
        {cars.map((car) => (
         <View style={gridstyles.gridItem}>
             <CarItem key={car.id} car={car} />
         </View>
        ))}
      </View>
    );
  } else {
    // Render as a horizontal list
    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {cars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            navigation.navigate('all-cars')
          }}>
            <Text style={styles.buttonText}>
              Voir toutes les voitures
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 12,
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DriversList;
