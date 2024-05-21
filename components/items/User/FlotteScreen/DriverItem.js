import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider, List, Paragraph, Title } from 'react-native-paper';


export const DriverItem1 = ({diver})=>{
 return (
         <Card key={diver.id} style={styles.card}>
          <Card.Content>
            <Image source={{ uri: diver.photo }} style={styles.image} />
            <Title style={styles.title}>{diver.marque}</Title>
            <Paragraph style={styles.paragraph}>{diver.ville}</Paragraph>
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


function DriverItem({user , driver}) {
const navigation = useNavigation()


    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('flotte-details' , {user , flotte})
        }} style= {{ paddingHorizontal: 8}}>
            <List.Item style= {{backgroundColor: 'white', marginVertical: 1}} title = {'DOSSOU Hubert'} left={()=>(
                <View style={styles.profilContainer}>
                        <Image source={{uri: 'https://www.izideals.sn/images-property/88c9777b0e8bcb981ad377e0af1286767ddaa543-B8WIND.jpg'}} style={styles.driverProfil}/>
                </View>
            )}   description={'Douala'} right={()=>(
                 <View style={{marginTop: 15}}>
                     <Ionicons  size={24} name='chevron-forward' style={{opacity: 0.2 , fontWeight: '100'}}/>
                 </View>
            )}>

            </List.Item>
            <Divider />
        </TouchableOpacity>
    );
}

export default DriverItem;




const styles = StyleSheet.create({
    driverProfil:{
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    profilContainer: {
        padding: 5
    }
})