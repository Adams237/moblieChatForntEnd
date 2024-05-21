import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import DrawerMenu, { items } from '../components/particular/DrawerMenu'
import SlidingComponent from '../components/general/SlidingComponent'
import NotificationsScreen from '../screens/NotificationsScreen'
import IteConfig from '../components/particular/AddChild/IteConfig'
import GerantDeCasForm from '../components/particular/AddChild/GerantDeCasForm'
import ChoixPreferenceForm from '../components/particular/AddChild/ChoixPreferenceForm'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MyContext from '../contextes/appContext'
import UrgenceScreen from '../screens/UrgenceScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HistoMenu from '../screens/Historique'
import HistoTrans from '../components/particular/Historique/histoTrans'
import HistoRide from '../components/particular/Historique/HistoRide'
import CustomHeader from '../components/general/CustomHeader'
import DriverScreen from '../screens/DriverScreen'
import R2SScreen from '../screens/R2SScreen'
import FleetScreen from '../screens/FleetScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotifications from '../components/particular/PushNotif/PushNotif';
import { colors } from '../assets/styles/colors';
import RatingScreen from '../screens/RatingScreen';
import RidesScreen from '../screens/RidesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../screens/UserHomeScreen';
import TabAppBar from '../components/sections/User/Appbars/TabAppBar';
import { useSelector } from 'react-redux';
import ChildDetails from '../screens/ChildDetails';
import ChildrenScreen from '../screens/Childrens';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const TabScreen = ({ user }) => {
  const components = [
    <UserHomeScreen user={user} />,
    <R2SScreen user={user} />,
    <ChildrenScreen user={user} />,
    <ProfileScreen user={user} />,

  ]
  const headerStyle = {
    backgroundColor: colors.primary,
  };
  return (
    <Tab.Navigator screenOptions={{
      header: ({ route, navigation }) => (
        <TabAppBar route={route} navigation={navigation} user={user} />
      )
    }}>
      {
        items.map((item, index) => {
          return (
            <Tab.Screen
            key={index.toString()}
              name={item.route}
              initialParams={{ user: user }}
              options={{
                tabBarLabel: item.name,
                tabBarIcon: ({ color }) => {
                  if (index === 0) {
                    return (
                      <MaterialIcons name={item.icon} size={26} color={color} />
                    )
                  } else {
                    return (
                      <Ionicons name={item.icon} size={26} color={color} />
                    )
                  }
                },
                headerTitleStyle: { // Style du titre dans l'en-tête
                  color: 'white', // Couleur du texte dans l'en-tête
                  textAlign: 'center', // Alignement du texte au centre
                  flex: 0, // Permet au texte de s'étendre pour être centré
                },

                headerStyle: { // Style de l'en-tête
                  backgroundColor: colors.primary, // Couleur de fond de l'en-tête
                },
              }}
            >
              {props => components[index]}

            </Tab.Screen>
          )
        })
      }
    </Tab.Navigator>
  )
}

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};


export default function User() {

  const navigationRef = useRef(null);
  const user = useSelector(state => state.currentUser.user)

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS,
        })}>

          <Stack.Screen name="driver" options={{ headerShown: false }}>
            {props => <TabScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="notifications" options={{ headerShown: false }}>
            {props => <NotificationsScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="child-details" options={{ headerShown: false }}>
            {props => <ChildDetails {...props} user={user} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
