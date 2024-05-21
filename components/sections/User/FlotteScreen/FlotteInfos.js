import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

function FlotteInfos(props) {
    return (
        <View style={{flex: 1}}>
            <List.Section>
                <List.Item title={"Nom de la structure"} left={()=>(<Ionicons name='car' size={30} />)} description={'School Drive Services'}>

                </List.Item>
                <Divider />
                <List.Item title={"Email"} left={()=>(<Ionicons name='mail' size={30} />)} description={'sds@gmail.com'}>

                </List.Item>
                <Divider />
                  <List.Item title={"Numéro de téléphone"} left={()=>(<Ionicons name='call' size={30} />)} description={'+237 68 45 78 41'}>

                </List.Item>
                <Divider />
                  <List.Item title={"Numéro de la CNI"} left={()=>(<Ionicons name='id-card-outline' size={30} />)} description={'587459628'}>

                </List.Item>
                <Divider />
            </List.Section>
        </View>
    );
}

export default FlotteInfos;