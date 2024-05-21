import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const CustomHeader = ({ title }) => {
  return (
    <View style={{ height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name={'arrow-back-outline'} size={24} color="black" />

      <Text style={{ fontSize: 20 , textAlign:'center' }}>{title}</Text>
    </View>
  );
};

export default CustomHeader 