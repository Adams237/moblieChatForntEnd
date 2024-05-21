import React, { useEffect , useState} from 'react';
import { View, ScrollView, Text , TouchableOpacity , Modal, TextInput, Button as RNButton} from 'react-native';
import { Avatar, Button, List, Divider, IconButton, Appbar } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import profileStyle from '../../../assets/styles/css/profile';
import AppBarr from '../../general/AppBarr';
import ModalContainer from '../../general/ModalContainer';
import UpDateForm from '../Profile/Update';
import PersonalInfos from '../Profile/PersonalInfos';

const Profile = ({  user }) => {
  let renders
  const [title , setTitle]= useState('')
  const [render , setRender ]= useState()
  const [components , setComponents] = useState(null)
   useEffect(()=>{
    

   }, [])
     renders= [
    {
      title: 'Informations des parents',
      render: <PersonalInfos />, 
      route: 'personInfo'
    }, 
   
     {
      title: "Informations de l'école",
      render: <UpDateForm />,
      route: 'infosSchool'
    }, 
  

  ]
   
   const navigation = useNavigation()
   const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(''); // État pour stocker le nouveau numéro de téléphone

  const handlePress = (item) => {
       
      setIsModalVisible(true); // Afficher la modale lorsque l'utilisateur appuie sur "Modifier"
     renders.map((render , index)=>{
       if (item===render.route) {
          setRender(render.render)
          setTitle(render.title)
       }
     })
   
  };

  const handleSubmit = () => {
    // Soumettre le formulaire de modification
    // console.log('Nouveau numéro de téléphone :', newPhoneNumber);
    setIsModalVisible(false); // Cacher la modale après la soumission du formulaire
  };


   
  return (
    <ScrollView style={profileStyle.container}>
      <View style={profileStyle.avatarContainer}>
        {/* Icône pour changer le thème */}
        <Avatar.Image
          source={require('../../../assets/images/t3.jpg')}
          size={100}
        />
      </View>

      {/* Nom et prénom */}
      <View style={profileStyle.nameContainer}>
        <Text style={profileStyle.nameText}>
          Gaston MAKOBA
        </Text>
      </View>

      {/* Numéro de téléphone et bouton "Modifier" */}
      <View style={profileStyle.contactContainer}>
        <Text style={profileStyle.phoneNumber}>
         +237 99234447(Numéro du parent)
        </Text>
        <Button mode="contained" style={profileStyle.editButton}  onPress={()=>handlePress('update')}>
         <Text style={{color: 'white'}}>Contacter les parents</Text>
        </Button>
      </View>

      {/* Liste des options */}
       <List.Section>
        
         <TouchableOpacity onPress={() => handlePress('personInfo')}>
          <List.Item
            title="Informations des parents"
            left={() => <List.Icon icon="account" />}
          />
        </TouchableOpacity>
       
       <TouchableOpacity onPress={() => handlePress('infosSchool')}>
          <List.Item
            title="Informations de  l'école"
            left={() => <List.Icon icon="school" />}
          />
        </TouchableOpacity>
       <TouchableOpacity onPress={() => handlePress('infosSchool')}>
          <List.Item
            title="Heures de ramassage"
            left={() => <Ionicons name='time' size={25} style={{marginTop: 6, marginHorizontal: 15}}/>}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('infosSchool')}>
          <List.Item
            title="Lieu de ramassage"
            left={() => <Ionicons name='location' size={25} style={{marginTop: 6, marginHorizontal: 15}}/>}
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
        <AppBarr title={title} goBack={()=>{setIsModalVisible(false)}}/>
       <ModalContainer children={render}/>
      </Modal>
    </ScrollView>
  );
};

export default Profile;