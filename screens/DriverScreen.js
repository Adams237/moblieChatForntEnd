import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { Card, Rating, Avatar, Icon, ListItem, Button } from 'react-native-elements';

const DriverScreen = ({user}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [driverRating, setDriverRating] = useState(0);
  const driverData = {   
    company: 'Nom de l\'entreprise',
    rating: 4.5,
    name: 'John Doe',
    reviews: [
      { id: 1, name: 'Jane Smith', review: 'Bon conducteur', date: '30/10/2023', avatar: require('../assets/images/t3.jpg') },
      { id: 2, name: 'Michael Johnson', review: 'Ponctuel', date: '29/10/2023', avatar: require('../assets/images/t3.jpg') }
    ],
    duration: '2 ans',
    carMake: 'Toyota',
    images: [require('../assets/images/car.jpeg')],
    insuranceConfirmation: true,
    location: 'Adresse du chauffeur',
    testimonial: 'Attestation sur l\'honneur du chauffeur',
    // ... Autres données du chauffeur
  };

  const handleReviewSubmit = () => {
    // Logic to handle the submission of the review
  };

  return (
    <ScrollView>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar
              rounded
              source={require('../assets/images/t3.jpg')}
            />
            <Text style={styles.driverName}>{driverData.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <Rating
              startingValue={driverData.rating}
              imageSize={20}
              readonly
            />
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.company}>Entreprise: {driverData.company}</Text>
          <Text style={styles.reviewTitle}>Avis des autres parents:</Text>
          {driverData.reviews.map((review, index) => (
            <ListItem key={review.id} bottomDivider>
              <Avatar source={review.avatar}               rounded
/>
              <ListItem.Content>
                <ListItem.Title>{review.name}</ListItem.Title>
                <ListItem.Subtitle>{review.review}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <Text>{review.date}</Text>
              </ListItem.Content>
            </ListItem>
          ))}
          <Text style={styles.duration}>Durée sur la plateforme: {driverData.duration}</Text>
          {/* ... Autres informations de base sur le chauffeur */}
          <Text style={styles.carMake}>Marque de voiture: {driverData.carMake}</Text>
          <Text style={styles.location}>Lieu d'habitation: {driverData.location}</Text>
          {/* ... Autres informations détaillées sur le chauffeur */}
          {driverData.images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.carImage}
            />
          ))}
          {driverData.insuranceConfirmation && (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Confirmer l'assurance</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Donner votre avis</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Donner votre avis</Text>
            <Rating
              showRating
              onFinishRating={(rating) => setDriverRating(rating)}
              style={{ paddingVertical: 10 }}
            />
            <TextInput
              style={styles.reviewInput}
              placeholder="Saisissez votre avis ici"
              multiline={true}
            />
            <Button
              title="Soumettre l'avis"
              onPress={handleReviewSubmit}
            />
             <View style={{height: 10}}></View>
            <Button
              title="Fermer"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    padding: 20,
  },
  driverName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    marginTop: 10,
    fontSize: 16,
  },
  reviewTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  duration: {
    marginTop: 10,
    fontSize: 16,
  },
  carMake: {
    marginTop: 10,
    fontSize: 16,
  },
  location: {
    marginTop: 10,
    fontSize: 16,
  },
  carImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  reviewInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
