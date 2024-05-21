
import * as React from 'react';
import { View, Text, StyleSheet , Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Haptics } from 'expo';
import formaterDateISO8601 from '../../../../functions/formatDate';

 const handleVibrate = () => {
    // Déclenche une vibration sur le téléphone
    Haptics.selectionAsync();
  };

const NotificationItem = ({ text, date }) => (
  <View style={styles.notificationItem}>
     <View style={styles.logo}>
          <Ionicons name={'mail'} size={24} color="black" />
     </View>
    <Text style={styles.notificationText}>{text}</Text>
    <Text style={styles.dateText}>{
      formaterDateISO8601(date)
    }</Text>
    
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

export default NotificationItem;
