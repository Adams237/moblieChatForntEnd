import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Modal, TextInput, Button as RNButton } from 'react-native';
import { Avatar, Button, List, Divider, IconButton, Appbar } from 'react-native-paper';
import profileStyle from '../assets/styles/css/profile';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ModalContainer from '../components/general/ModalContainer';
import AppBarr from '../components/general/AppBarr';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalInfos from '../components/particular/Profile/PersonalInfos';
import UpDateForm from '../components/particular/Profile/Update';
import RidesScreen from './RidesScreen';
import RatingScreen from './RatingScreen';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redurcer/userSlice';
import UpdateProfil from '../components/particular/Profile/UpdateProfil';

const Profile = ({ user }) => {
  console.log(user.photo)
  let renders
  const [title, setTitle] = useState('')
  const [render, setRender] = useState()
  const [components, setComponents] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {


  }, [])
  renders = [
    {
      title: 'Informations personnelles',
      render: <PersonalInfos user={user} />,
      route: 'personInfo'
    },
    {
      title: 'Modifier mon profil',
      render: <UpDateForm />,
      route: 'update'
    },
    // {
    //   title: 'Langue',
    //   render: <UpDateForm />,
    //   route: 'langue'
    // },
    {
      title: 'Modifier',
      render: <UpDateForm />,
      route: 'security'
    },
    {
      title: 'Mes contrats',
      render: <UpDateForm />,
      route: 'contracts'
    },
    {
      title: 'Confidentialité',
      render: <UpdateProfil />,
      route: 'confidentiality'
    },
    {
      title: 'Mes déplacement',
      render: <RidesScreen />,
      route: 'rides'
    },
    {
      title: 'Archivage',
      render: <UpDateForm />,
      route: 'archivage'
    },
    {
      title: 'Ma note globale',
      render: <UpDateForm />,
      route: 'note'
    },
    {
      title: "Notez l'application ",
      render: <RatingScreen />,
      route: 'avis'
    },

  ]

  const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(''); // État pour stocker le nouveau numéro de téléphone

  const handlePress = (item) => {

    setIsModalVisible(true); // Afficher la modale lorsque l'utilisateur appuie sur "Modifier"
    renders.map((render) => {
      if (item === render.route) {
        setRender(render.render)
        setTitle(render.title)
      }
    })

  };


  const handleSubmit = () => {
    dispatch(logout())
    
  };



  return (
    <ScrollView style={profileStyle.container}>
      <View style={profileStyle.avatarContainer}>
        {/* Icône pour changer le thème */}
        <Image
          source={{ uri: `https://r2sbackend-1.onrender.com/${user.photo}` }}
          size={100}
          style={styles.driverProfil}

        />
      </View>

      {/* Nom et prénom */}
      <View style={profileStyle.nameContainer}>
        <Text style={profileStyle.nameText}>
          {user?.nom}
        </Text>
      </View>

      {/* Numéro de téléphone et bouton "Modifier" */}
      <View style={profileStyle.contactContainer}>
        <Text style={profileStyle.phoneNumber}>
          {user?.email}
        </Text>

      </View>
      <Divider />
      {/* Liste des options */}
      <List.Section>
        <TouchableOpacity onPress={() => handlePress('personInfo')}>
          <List.Item
            title="Informations personnelles"
            left={() => <List.Icon icon="account" />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('security')}>
          <List.Item
            title="Modifier mon mot de passe"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        {/* <TouchableOpacity onPress={() => handlePress('langue')}>
          <List.Item
            title="Langue"
            left={() => <List.Icon icon="earth" />}

          />
        </TouchableOpacity> */}
        <Divider />
        <TouchableOpacity onPress={() => handlePress('contracts')}>
          <List.Item
            title="Mes contrats"
            left={() => <List.Icon icon="bus" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('note')}>
          <List.Item
            title="Ma note globale"
            left={() => <List.Icon icon="file-document" />}
          />
        </TouchableOpacity>
        <Divider />
        {/* Ajoutez d'autres éléments de la liste ci-dessous */}
        <TouchableOpacity onPress={() => handlePress('CGV/CGU')}>
          <List.Item
            title="CGV/CGU"
            left={() => <List.Icon icon="bookmark" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('avis')}>
          <List.Item
            title="Notez l'application"
            left={() => <List.Icon icon="star" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('confidentiality')}>
          <List.Item
            title="Confidentialité"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Archivage')}>
          <List.Item
            title="Archivage"
            left={() => <List.Icon icon="archive" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('rides')}>
          <List.Item
            title="Mes déplacements"
            left={() => <List.Icon icon="archive" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={ handleSubmit}>
          <List.Item
            title="Se déconnecter"
            left={() => <List.Icon icon="logout" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Supprimer mon compte')}>
          <List.Item
            title="Supprimer mon compte"
            left={() => <List.Icon icon="delete" />}
          />
        </TouchableOpacity>
      </List.Section>





      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false); // Cacher la modale lorsqu'on appuie sur le bouton de fermeture par exemple
        }}
      >
        <AppBarr title={title} goBack={() => { setIsModalVisible(false) }} />
        <ModalContainer children={render} />
      </Modal>
    </ScrollView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  driverProfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'center',
    borderColor: 'gray',
    borderWidth: 2

  },
  profilContainer: {
    padding: 5,

  }
})