import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import ChildItem from '../../../items/User/HomeSScreen/ChildItem';

function Children({user}) {
    return (
       <View style={styles.container}>
        <List.Subheader>
           Enfants ajoutés
        </List.Subheader>
          <List.Section>
            {
             [1 , 5 , 8 ].map((child , index)=>{
                 return(
                    <ChildItem key={index}/>
                 )
             })
            }
        </List.Section>
       </View>
    );
}

export default Children;

const styles = StyleSheet.create({
  container: {
     flex: 1
  },
});
