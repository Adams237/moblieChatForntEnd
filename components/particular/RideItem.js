
import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RideItem = ({ text, date, icon, distance }) => (
  <View style={styles.notificationItem}>
    <View style={styles.logo}>
      <Ionicons name={icon} size={24} color="black" />
    </View>
    <View style={{ flexDirection:"column" }}>
      <Text style={styles.notificationText}> Nombre d'enfants Transportés : {text}</Text>
      <Text style={styles.notificationText}> Distance parcourue : { parseInt(distance)} Km</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>


  </View>
);



const styles = StyleSheet.create({

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  notificationText: {
    flex: 1,
    marginRight: 10,
  },
  dateText: {
    color: 'gray',
  },
  logo: {
    width: '10%',
    aspectRatio: 1, // for a square logo
  },
});

export default RideItem;
