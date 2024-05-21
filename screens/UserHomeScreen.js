import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import UrgencesComponent from '../components/particular/Urgences/Urgences';
import { Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Links from '../components/particular/Links/Links';
import DriverRide from '../components/particular/Driver/Driver';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { driverDataApi } from '../utils/api';
import { login } from '../redurcer/userSlice';

function UserHomeScreen({user}) {
    const dispatch = useDispatch()
    // console.log(driverDataApi+'/'+user.id)
   const driverId = user.id ||user._id

 useEffect(() => {
    const getDriver = async () => {
      try {
        const response = await axios.get(`${driverDataApi}/${driverId}`);
        const data = response.data;

        if (data !== user) {
          dispatch(login(data));
          // console.log('data', data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (driverId) {
      getDriver();
    }
  }, [driverId, driverDataApi, dispatch]);
    return (
        <ScrollView style={{flex: 1}} horizontal={false}>

        <View style={styles.title}>
                <Title>
                Les urgences récentes
            </Title>
            </View>
            <UrgencesComponent user={user}/>


             <View style={styles.title}>
                <Title>
                Les liens importants
            </Title>
            </View>
          <Links user={user}/>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
  title:{
     padding: 20
  }
});
export default UserHomeScreen;


