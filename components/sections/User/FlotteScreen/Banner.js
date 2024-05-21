import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Avatar } from '@rneui/themed';
import { colors } from '../../../../assets/styles/colors';

const FlotteBanner = ({user , shop}) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Accueil', 'Profil', 'Paramètres', 'À propos'];

  const handleTabPress = (index) => {
    setActiveTab(index);
    // Ajoutez d'autres actions ici en cas de besoin
  };

  return (
   <View>
    <View>
      <View style={styles.header}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavF3hyHDiup-QI1RNEY-6_9hhENYj4JFXBVbvSWU-Gg&s'}} style={styles.coverPhoto} />
        <View style={styles.avatarContainer}>
          <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6EhGRsNJmvnZuJs-2UtzRfUiSmvqGOxHXq5VNp_AWw&s'}} style={styles.avatar} />
        </View>
      </View>

      {/* Informations sur la boutique */}
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>
          {'School Drive Service'}
        </Text>
      </View>
    </View>


   


   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

   header: {
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    position: 'absolute',
    left: '50%',
    marginLeft: -50, // moitié de la largeur de l'avatar
    top: 90, // moitié de la hauteur de la photo de couverture
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightgray',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  shopInfo: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 50
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
  },

  scrollContent: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.primary,

  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FlotteBanner;
