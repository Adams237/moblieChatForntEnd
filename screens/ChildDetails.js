import React, { useState } from 'react';
import { StyleSheet, View, Linking, Modal } from 'react-native';
import StackAppBarr from '../components/sections/User/Appbars/StackAppBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, List } from 'react-native-paper';
import profileStyle from '../assets/styles/css/profile';
import Br from '../components/widgets/br/br';
import { Text } from 'react-native';
import Links from '../components/sections/User/Child/Links';
import { colors } from '../assets/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import ModalContainer from '../components/general/ModalContainer';
import SendUrgence from '../components/particular/ModalViews/SendUrgence';

function ChildDetails({ user }) {
  const route = useRoute()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { child } = route.params
  const navigation = useNavigation()
  // console.log('parent de enfant' , child)
  const call = (tel) => {


    Linking.openURL(`tel:${tel}`)
  }


  return (
    <View style={{ flex: 1 }}>
      <StackAppBarr title={'' + child.nom + '  '} goBack={navigation.goBack} />
      <View style={profileStyle.avatarContainer}>
        <Br size={20} />
        <Avatar.Image
          source={{ uri: `https://r2sbackend-1.onrender.com/${child.photo}` }}
          size={100}
        />
        <View style={profileStyle.nameContainer}>
          <Text style={profileStyle.nameText}>
            {'' + child.nom + '  '}
          </Text>
          <Text >
            {'' + child.ecole.nomEcole + '  '}
          </Text>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <TouchableOpacity style={styles.gridButtom} onPress={() => call(child.ecole.phone)}>
            <Text style={styles.gridText}>Contacter Ecole</Text>
            <Ionicons name="call" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridItem}>
          <TouchableOpacity onPress={() => {
            if (!child.parent) {
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'numero du parent indisponible veiller contacter l\'école',
                visibilityTime: 2000,
                autoHide: true,
              })
              return
            }
            call(child.parent.phone)
          }} style={styles.gridButtom}>
            <Text style={styles.gridText} >Contacter Parent</Text>
            <Ionicons name="call" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <TouchableOpacity style={styles.gridButtom} onPress={()=>call(98679885)}>
            <Text style={styles.gridText}>Contacter Betacar</Text>
            <Ionicons name="call" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.gridItem}>
          <TouchableOpacity style={styles.gridButtom} onPress={()=>setIsModalVisible(true)} >
            <Text style={styles.gridText}>Envoyer Une Urgence</Text>
            <Ionicons name="warning" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Toast position='top' />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false); // Cacher la modale lorsqu'on appuie sur le bouton de fermeture par exemple
        }}
      >
        <StackAppBarr title="Urgence" goBack={() => { setIsModalVisible(false) }} />
        <ModalContainer children={<SendUrgence user={user} child={child} />} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 100,
    margin: 5,
    padding: 10,
    borderRadius: 10,

  },
  gridButtom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  gridText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  }
})

export default ChildDetails;