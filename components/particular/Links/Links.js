import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Linking, Modal, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../assets/styles/colors';
import AppBarr from '../../general/AppBarr';
import ModalContainer from '../../general/ModalContainer';
import RidesScreen from '../../../screens/RidesScreen';
import SendUrgence from '../ModalViews/SendUrgence';
// import { render } from 'react-dom';
import Resa from '../ModalViews/Resa';
import ChildrenScreen from '../../../screens/Childrens';
import { useNavigation } from '@react-navigation/native';




function Links({ user }) {

  const links = [
    {
      name: "Liste d'enfants",
      icon: 'person',
      render: <ChildrenScreen user={user} />
    },
    {
      name: 'Rapports',
      icon: 'book',
      render: <RidesScreen user={user} />

    },

    {
      name: 'Contacter un Betacar',
      icon: 'call-outline'
    },
    {
      name: 'Envoyer une urgence',
      icon: 'warning',
      render: <SendUrgence user={user} />
    },
    {
      name: 'Historique de mes deplacements',
      icon: 'bus',
      render: <RidesScreen user={user} />
    },


    {
      name: 'Ma note globale',
      icon: 'star'
    },


  ]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [title, setTitle] = useState('')
  const navigate = useNavigation()
  const [render, setRender] = useState(null)
  const GridElement = ({ title, iconName, render }) => (
    <TouchableOpacity style={styles.gridItem} onPress={() => {

      if (render !== undefined) {
        setRender(render)
        setTitle(title)
        setIsModalVisible(true)
        return
      }
      if(title === "Contacter un Betacar"){
        Linking.openURL(`tel:698679885`)
      }
    }}>
      <Ionicons name={iconName} size={30} color={colors.primary} />
      <Text style={styles.gridItemText}>{title}</Text>
    </TouchableOpacity>
  );



  return (
    <View>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <GridElement title={item.name} iconName={item.icon} render={item.render} />
        )}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2} // Pour afficher en 2 colonnes, modifiez selon le nombre de colonnes souhaité
        contentContainerStyle={styles.gridContainer}
      />


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
    </View>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10,

  },
  gridItemText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Links;