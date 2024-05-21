import * as React from 'react';
import { Button, View, Text ,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'


export const items = [
   {
  icon: 'home',
  name: 'Acceuil', 
  route: 'Acceuil',
  headerShow: false
   }, 
   {
  icon: 'location',
  name: 'R2S', 
  route: 'R2S',
  headerShow: false
   }, 
  {

  icon: 'people',
  name: 'Enfants',
  route: 'Enfants',
  headerShow: true

   },

  {
  icon: 'person',
  name: 'Profil',
  route: 'Mon profile',
    headerShow: true

   },
 
    /*  {
  icon: 'warning',
  route: 'Les urgences',
  headerShow: true
   },
   
       {
  icon: 'time',
  route: 'Mes déplacements',
    headerShow: true

   },

        {
  icon: 'star',
  route: 'Donner une note à Betacar',
    headerShow: true

  
   },
    */
   
  
  
   
     
]


const DrawerMenu = ({ navigation }) => {
  return (
  <View style={{ marginTop: 50 }}>
    
      {
        items.map((item)=>{
          return(
              <View>
               <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{ flexDirection: 'row', alignItems: 'center',    marginTop: 20, marginLeft: 20 }}>
                <Ionicons name={item.icon} size={24} color="black" />
                 <Text style={{ marginLeft: 10 }} >{item.route}</Text>
               </TouchableOpacity>
                <View style={{marginTop: 10}}>
                
                </View>
               <Divider />
              </View>
          )
        })
      }
    </View>
  );
};
 

export default DrawerMenu