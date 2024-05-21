import * as React from 'react';
import { View,  StyleSheet, Image , Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'
import { useNavigation } from '@react-navigation/native';
import PushNotification from '../components/particular/PushNotif/PushNotif';
import MaPosition from '../components/particular/Driver/MaPosition';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { driverDataApi } from '../utils/api';

export default   HomeScreen = ({navigation , user})=> {
const { width, height } = Dimensions.get('window');



  return (
     <View>
      <MaPosition />
         <View style={{padding: 10 , width: width , backgroundColor: colors.primary}}>
          <Image   style={{ width: width, height: 500 }}source={require('../assets/images/banniar2.png')} />
      </View>


    <View style={styles.container}>
       <Text style={styles.message}>
          Les trajets éducatifs confortables et sûrs
       </Text>

       <View style={styles.actionsButtons}>
           <Button
      mode="contained"
      onPress={() => navigation.navigate('Se connecter')}
      style={styles.signUpBtn}
      labelStyle={styles.label}
    >
      Se connecter 
    </Button>

       </View>
    </View>
     </View>
  );
}



const styles = StyleSheet.create({
  container:{
    marginTop: 30, 
    padding: 10
  },
   message: {
     fontWeight: '900',
     textAlign: 'center',
     fontSize: 30, 
     opacity: 0.6

   }, 
   actionsButtons:{
     padding: 20
   },
      signUpBtn: {
    borderRadius: 20, 
    padding: 5, 
    marginVertical: 4, 
    backgroundColor: colors.primary
  },
  signInBtn:{
    marginVertical: 4, 

  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },
 

});
