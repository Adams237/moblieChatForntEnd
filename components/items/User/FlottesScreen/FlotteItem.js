import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Divider, List } from 'react-native-paper';

function FlotteItem({user , flotte}) {
const navigation = useNavigation()


    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('flotte-details' , {user , flotte})
        }} style= {{ paddingHorizontal: 8}}>
            <List.Item style= {{backgroundColor: 'white', marginVertical: 1}} title = {'School services transport'} left={()=>(
                <View style={styles.logoContainer}>
                        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRavF3hyHDiup-QI1RNEY-6_9hhENYj4JFXBVbvSWU-Gg&s'}} style={styles.flotteLogo}/>
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

export default FlotteItem;




const styles = StyleSheet.create({
    flotteLogo:{
      width: 50,
      height: 50,
      borderRadius: 10,
      
    },
    logoContainer: {
        padding: 5
    }
})