import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { colors } from '../assets/styles/colors';

const RatingScreen = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [visible , setVisible] = useState(false)

  const handleSubmit = () => {
    // Ici, vous pouvez soumettre la note (rating) et l'avis (review) à votre backend ou effectuer toute autre action nécessaire.
    // console.log(`Avis: ${review}`);
    // console.log(`Note: ${rating}`);
    // Vous pouvez ajouter ici la logique pour envoyer les données à votre backend ou faire d'autres opérations nécessaires.
    setVisible(true)
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Saisir un avis"
        value={review}
        onChangeText={(text) => setReview(text)}
        mode="outlined"
        style={styles.input}
        multiline
      />
       <Rating
        type="star"
        ratingCount={5}
        imageSize={40}
        startingValue={rating}
        onFinishRating={(value) => setRating(value)}
        style={styles.rating}
      />
      <Button mode="contained" onPress={()=>{handleSubmit()}} style={styles.button}>
         <Text style={styles.label}>Envoyer mon avis</Text>
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={()=>{setVisible(false)}}
        action={{
          label: 'fermer',
          onPress: () => {
            // Do something
          },
        }}>
        Votre avis a été envoyé avec succès !
      </Snackbar> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
  rating: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20, 
    padding: 5, 
    marginVertical: 4, 
    backgroundColor: colors.primary
  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },
});

export default RatingScreen;
