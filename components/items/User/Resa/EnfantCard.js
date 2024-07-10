// EnfantCard.js
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Modal } from 'react-native';
import { Avatar, Card, Checkbox, List, Paragraph, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';


const EnfantCard = ({ child, onSwitchChange  }) => {
    const schools = []
     const school  = schools.filter(school=>(school._id===child?.ecole))

const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{
       navigation.navigate('child-details' , {child})
    }}>
          <List.Item
            title={`${child.nom}`}
            description = {child.ecole.nomEcole}
            right={() =>  <Switch
            value={child.isChecked}
            onValueChange={(newValue) => onSwitchChange(child.id, newValue)}
          />}
             left={() =>  <Image source={{ uri: `https://r2sbackend-1.onrender.com/${child.photo}` }} style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}/>}
          />

      
    </TouchableOpacity> 
  );
};

export default EnfantCard;
