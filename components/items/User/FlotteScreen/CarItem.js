import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

function CarItem({car}) {
    return (
         <Card key={car.id} style={styles.card}>
          <Card.Content>
            <Image source={{ uri: car.photo }} style={styles.image} />
            <Title style={styles.title}>{car.marque}</Title>
            <Paragraph style={styles.paragraph}>{car.prix}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>
                <Text style={{color: 'white' , textTransform: 'none'}}>
                    Voir plus
                </Text>
            </Button>
          </Card.Actions>
        </Card>
    );
}

export default CarItem;


const {height , width} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
    elevation: 4,
    width: width*0.4
    
  },
  image: {
    width: '100%',
    height: 70,
    objectFit: 'contain'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    fontWeight: '900'
  },
  button: {
    marginTop: 10,
    color: 'white', 
    
  },
  
});
