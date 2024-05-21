import React from 'react';
import { View } from 'react-native';
import StackAppBarr from '../components/sections/User/Appbars/StackAppBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, List } from 'react-native-paper';
import profileStyle from '../assets/styles/css/profile';
import Br from '../components/widgets/br/br';
import { Text } from 'react-native';
import Links from '../components/sections/User/Child/Links';

function ChildDetails({user}) {
    const route =useRoute()
    const {child} = route.params
    const navigation = useNavigation()
    // console.log('parent de enfant' , child)

    
    return (
        <View style={{flex: 1}}>
            <StackAppBarr title={''+child.nom+ '  '} goBack={navigation.goBack}/>
           <View style={profileStyle.avatarContainer}>
             <Br size={20}/>
             <Avatar.Image
               source={{uri: child.photoUrl}}
                size={100}
             />
             <View style={profileStyle.nameContainer}>
              <Text style={profileStyle.nameText}>
                   {''+child.nom+ '  '}             
               </Text>
             </View>
           </View>
           <Links user={user} child={child}/>
        </View>
    );
}

export default ChildDetails;