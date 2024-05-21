import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, Avatar, IconButton } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomSearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
const userObject = {id: 'Bonjour'}

  const goToProfileScreen = () => {
    navigation.navigate('Profile'); // Remplacez 'Profile' par le nom de votre écran de profil
  };
  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
    
        <Ionicons name='menu' size={30}/>
       <TextInput placeholder='Rechercher...' style={styles.input}/>
        <TouchableWithoutFeedback onPress={goToProfileScreen}>
        <Avatar.Image source={require('../../assets/images/t3.jpg')} size={40} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    zIndex: 1200,
    top: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    borderRadius: 50, 
    borderColor: 'black',
    borderWidth: 0.2,
    flex: 0.9,
    flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-evenly',  

  },
  input: {
    flex: 0.8,
    marginLeft: -15,
    outline: 'none'
  },
});

export default CustomSearchBar;
