import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider, List, Paragraph, Title } from 'react-native-paper';




function ChildItem({user , child}) {
const navigation = useNavigation()


    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('child-details' , {user , child})
        }} style= {{ paddingHorizontal: 8}}>
            <List.Item style= {{backgroundColor: 'white', marginVertical: 1}} title = {'DOSSOU Hubert'} left={()=>(
                <View style={styles.profilContainer}>
                        <Image source={{uri: 'https://www.shutterstock.com/image-photo/portrait-smiling-african-american-schoolboy-260nw-2326745069.jpg'}} style={styles.driverProfil}/>
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

export default ChildItem;




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