// MyAppbar.js
import React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MyAppbar = ({search , goBack}) => {
  const _handleSearch = () => {
    // Action à effectuer lors de la recherche
    console.log('Recherche en cours');
  };

  const _handleNotificationIconPress = () => {
    // Action à effectuer lors de l'appui sur l'icône de notification
    console.log('Icône de notification pressée');
  };

  return (
    <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={goBack}  color="black" />
      <Searchbar
        placeholder="Rechercher"
        onChangeText={_handleSearch}
        value={search}
        style={styles.searchbar}
      />
      
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white', 
    shadowColor: 'white'
  },
  searchbar: {
    backgroundColor: '#f4f5f8', 
    flex: 1,
    marginRight: 10,
    borderRadius: 30
  },
});

export default MyAppbar;
