// MyAppbar.js
import React from 'react';
import { Appbar, Avatar, Searchbar, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../assets/styles/colors';

const TabAppBar = ({user}) => {

  const navigation = useNavigation();

  const _handleNotificationIconPress = () => {
    // Action à effectuer lors de l'appui sur l'icône de notification
    navigation.navigate("notifications")
  };

  const _openProfile = () => {
    navigation.navigate('profil');
  };

  // Remplacez 'groupName' par le nom de l'utilisateur
  const username = user?.nom;
//  console.log('chaufeur' , user)
  // Obtenez la première lettre du nom de l'utilisateur
  const avatarInitial = username?.charAt(0).toUpperCase();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon={() => <Avatar.Text color={colors.primary} size={30} label={avatarInitial} style={styles.avatar} />} onPress={_openProfile} />
        <Appbar.Content title={username}  color='white'>
        </Appbar.Content>
      <Appbar.Action icon="bell" color='white' onPress={_handleNotificationIconPress}/>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    shadowColor: 'white',
  },
  avatar: {
    backgroundColor: 'white', 
    color: colors.primary,
    marginTop: -5,
    marginLeft: -4
    // Couleur d'arrière-plan rouge pour l'avatar
  },
  searchbar: {
    backgroundColor: '#f4f5f8',
    flex: 1,
    marginRight: 10,
    borderRadius: 30,
  },
});

export default TabAppBar;
