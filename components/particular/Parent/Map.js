import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { ref, set } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';
import axios from 'axios';
import { decode } from '@mapbox/polyline';




const Map = ({ user, enfants }) => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [t, setT] = useState(0)
  const driverId = user.id || user._id;

  function sendMyPostion(location) {
    const dataRef = ref(db, 'locations/' + driverId);

    const data = {
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      speed: location.speed // Envoyer la vitesse à Firebase
    };
    set(dataRef, data);
  }
  const getDirection = async (startLocaion, destinationLocation) => {
    try {
      const key = "AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA"
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocaion}&destination=${destinationLocation}&key=${key}`
      )
      // console.log('papa', resp);
      let resJson = await resp.json()
      // console.log('res', resJson);
      let points = decode(resJson.routes[0].overview_polyline.points)
      // console.log('point', points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      return coords
    } catch (error) {
      console.log('err', error);
      return error
    }
  }
  const updatePosition = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location2 = await Location.getLastKnownPositionAsync({});
      // let location2 = {
      //   "coords": { "accuracy": 100, "altitude": 768.4000244140625, "altitudeAccuracy": 100, "heading": 0, "latitude": 3.8571043, "longitude": 11.4815523, "speed": 0 }, "mocked": false, "timestamp": 1716884553857
      // }
      let coords = [
        { latitude: (location2.coords.latitude), longitude: (location2.coords.longitude) }
      ]
      enfants.map(item => {
        const coordinates = {
          latitude: (item.ramassage[0].latitude),
          longitude: (item.ramassage[0].lontidute)
        }
        coords.push(coordinates)
      })
      let allCoord = []
      for(i=0; i<coords.length-1; i++){
        const data = await getDirection(`${coords[i].latitude},${coords[i].longitude}`, `${coords[i+1].latitude},${coords[i+1].longitude}`)
        allCoord = [...allCoord, ...data]
      }
      
      setRoute(allCoord)
      if (location2) {
        sendMyPostion(location2.coords);
      }
      // console.log("iii", location2)
      setLocation(location2.coords);


      // setRoute(coords);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    updatePosition()
  }, []);
  setInterval(async()=>{
    setT(t+1)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location2 = await Location.getLastKnownPositionAsync({});
      sendMyPostion(location2.coords);
      setLocation(location2.coords)
    } catch (error) {
      console.log(error);
    }
  },10000)


  if (!location) {
    return <Text>Chargement</Text>;
  }

  return (
    <View style={styles.container}>
      {/* {console.log(t)} */}
      <MapView style={styles.map} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
        // ref={mapRef}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          }}
          title='Le chauffeur'
          pinColor="red"
          icon={() => <Ionicons name='home' size={50} color={'red'} />}
          image={require('../../../assets/images/icon-car.png')}
        />
        {
          enfants.map(item => {
            return (
              <Marker
                key={item._id}
                coordinate={{
                  latitude: parseFloat(item.ramassage[0].latitude),
                  longitude: parseFloat(item.ramassage[0].lontidute),
                }}
                title={item.nom}
                pinColor="red"
                // icon={() => <Ionicons name='home' size={50} color={'red'} />}
                image={require('../../../assets/images/icon-student.png')}
              />
            )
          })
        }

        {<Polyline coordinates={route} strokeColor="blue" strokeWidth={4} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;

// setInterval(updatePosition,10000)

  // console.log(enfants[0])

  // useEffect(() => {
  //   if (enfants) {
  //     const origine = enfants[0]?.ramassage[0];
  //     const destination = enfants[0]?.lieudepot[0];
  //     // console.log('Les enfants', enfants[0]?.ramassage[0]);
  //     setRamassage({
  //       latitude: origine.latitude,
  //       longitude: origine.lontidute
  //     });
  //     setLieudepot({
  //       latitude: destination.latitude,
  //       longitude: destination.lontidute
  //     });
  //   }
  // }, [enfants]);
  // useEffect(() => {
  //   if (location !== null) {
  //     let coords = [
  //       { latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) }
  //     ];
  //     enfants.map(item=>{
  //       const coordinates = {
  //         latitude: parseFloat(item.ramassage[0].latitude),
  //         longitude: parseFloat(item.ramassage[0].lontidute)
  //       }
  //       coords.push(coordinates)
  //     })
  //     setRoute(coords);
  //     // let totalDistance = 0;
  //     // for (let i = 0; i < coords.length - 1; i++) {
  //     //   const distance = haversineDistance(
  //     //     coords[i].latitude,
  //     //     coords[i].longitude,
  //     //     coords[i + 1].latitude,
  //     //     coords[i + 1].longitude
  //     //   );
  //     //   console.log(distance)
  //     //   totalDistance += distance;
  //     // }
  //     // setDistance(totalDistance.toFixed(2));
  //   }
  // }, []);

  // const haversineDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371; // Rayon de la Terre en kilomètres
  //   const dLat = toRadians(lat2 - lat1);
  //   const dLon = toRadians(lon2 - lon1);

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(toRadians(lat1)) *
  //     Math.cos(toRadians(lat2)) *
  //     Math.sin(dLon / 2) *
  //     Math.sin(dLon / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c;

  //   return distance;
  // };

  // const toRadians = (angle) => {
  //   return (angle * Math.PI) / 180;
  // };

  // useEffect(() => {
  //   if (location !== null && prevLocation !== null && prevTime !== null) {
  //     const currentTime = new Date();
  //     const timeDiffInSeconds = (currentTime - prevTime) / 1000; // Convertir en secondes
  //     const distance = haversineDistance(
  //       prevLocation.latitude,
  //       prevLocation.longitude,
  //       location.latitude,
  //       location.longitude
  //     );
  //     const speed = distance / timeDiffInSeconds; // Calculer la vitesse en km/h
  //     setSpeed(speed);
  //     setPrevLocation(location);
  //     setPrevTime(currentTime);
  //     sendMyPostion(location);
  //   }
  // }, [location]);

