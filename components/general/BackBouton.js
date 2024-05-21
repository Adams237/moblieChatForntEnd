import React, { useState ,useContext } from 'react';
import { View, Text, StyleSheet, Button, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../contextes/appContext'

const BackBouton = () => {
  const {globalState , setGlobalState} = useContext(MyContext)
  const navigation = useNavigation()
 
  const goBack = ()=>{
    navigation.goBack()
    setGlobalState(prevState=>({
      ...prevState, 
      slidePosition: {
        start: 0,
        end: 1000
      }
    }))
  }
  return (     
      <Button title="Précédent" onPress={goBack} />
  );
};

const styles = StyleSheet.create({
 

});

export default BackBouton;
