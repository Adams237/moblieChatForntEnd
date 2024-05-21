import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Animated, Easing, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { onValue, ref } from 'firebase/database';
import { ScrollView } from 'react-native-gesture-handler';
import StackAppBarr from '../components/sections/User/Appbars/StackAppBar';
import { db } from '../backend/firebaseConfig';
import NotificationItem from '../components/particular/NotificationItem';

enableScreens();




  
const NotificationsScreen = () => {
   const [notifications , setNotifications] = useState([])
 const navigation = useNavigation()


 
  useEffect(()=>{
    const notificationsRef = ref(db, 'notifications')

    onValue(notificationsRef , (sn)=>{
      const data = sn.val()
      if (data) {
        const dataArray = Object.entries(data).map(([key , value])=>({
          ...value,
          id: key
        }))

        const filtered = dataArray.filter(notification=>(
          notification?.receivers?.includes()
        ))
        setNotifications(filtered)
      }
    })
  },[])
   


  return (
     <View style={styles.container}>
        <StackAppBarr title={'Notifications'} goBack={navigation.goBack}/>
          {
            notifications.length>0 ? (
                 <ScrollView style={{padding: 12}}>
            {
                notifications&&notifications.map((item)=>{
                  return (
                      <NotificationItem text={item?.body} date={item?.date}/>
                  )
                })
            }
        </ScrollView>
            ):( <View style={{flex: 1 , justifyContent:'center' , alignItems: 'center'}}>
                <Text>
                  Aucune notification
                </Text>
            </View>)
          }
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  
  },
});

export default NotificationsScreen;
