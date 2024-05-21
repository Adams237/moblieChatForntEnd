import  React , { useContext } from 'react';
import { Button, View, Text ,TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import MyContext from '../contextes/appContext'
import HistoTrans from '../components/particular/Historique/histoTrans'
import HistoRide from '../components/particular/Historique/HistoRide'

export const items = [
 
  {
  icon: 'cash',
  route: 'Historique des transactions',
  component: <HistoTrans />
  
   },
          {
  icon: 'car',
  route: 'Historique des déplacements',
    component: <HistoRide />

   },
  
]


const HistoMenu = ({user}) => {
  const {globalState, setGlobalState} = useContext(MyContext)
  const navigation = useNavigation()
  const navigate = (item)=>{
  
     navigation.navigate(item.route)
  }



  return (
  <View style={{ marginTop: 50 }}>
    
      {
        items.map((item)=>{
          return(
              <View>
               <TouchableOpacity onPress={() => navigate(item)} style={{ flexDirection: 'row', alignItems: 'center',    marginTop: 20, marginLeft: 20 }}>
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
 

export default HistoMenu