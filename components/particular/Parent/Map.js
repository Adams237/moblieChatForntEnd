import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Image, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from "react-native-geolocation-service"
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Polyline } from 'react-native-maps';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ref, set } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';
import axios from 'axios';
import { decode } from '@mapbox/polyline';



const Map = ({ user, enfants }) => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [mapWiewRef, setMapviewRef] = useState(null)
  const [valu, setVal] = useState(0)
  const previousLocation = useRef(null)
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
      let resJson = await resp.json()
      let points = decode(resJson.routes[0].overview_polyline.points)
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

    let location2 = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 5
    },
      async (newPosition) => {
        handleChangeRegion({
          latitude: newPosition.coords.latitude,
          longitude: newPosition.coords.longitude
        })
       
        
        const allCoord = await getDirection(`${newPosition.coords.latitude},${newPosition.coords.longitude}`,
          `${enfants.ramassage[0].latitude},${enfants.ramassage[0].lontidute}`)

      
        setRoute(allCoord)
        sendMyPostion(newPosition.coords);
        setLocation(newPosition.coords);
        const newVal = valu +1
        setVal(newVal)

      }
    );
    return location2
  }

  // useEffect(()=>{
  //   // console.log("tessssssssst")
  //   // const requestPositionPermission = async()=>{
  //   //   if(Platform.OS ==="android" ){
  //   //     console.log("alllonns")
  //   //     await PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  //   //     console.log("alllllezzzz")
  //   //   }
  //   // }
  //   // console.log("tesssssssssss22222333333")
  //   // requestPositionPermission()
  //   Geolocation.watchPosition(
  //     (position)=>{
  //       console.log(position.coords)
  //     },
  //     (error) =>{
  //       console.log(error)
  //     },
  //     {
  //       enableHighAccuracy:true,
  //       maximumAge:10000
  //     }
  //   )
  // },[])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const watchId = await updatePosition()

      return () => {
        watchId.remove()
      }

    })()
  }, [enfants]);
  const handleChangeRegion = (region) => {
    console.log("test")
    if (mapWiewRef) {
      mapWiewRef.animateToRegion(region, 1000)
    }
  }
  const localization = [
    {
      latitude: 3.829448,
      longitude: 11.476066,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    {
      latitude: 3.829225,
      longitude: 11.475709,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    {
      latitude: 3.829168,
      longitude: 11.475849,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    {
      latitude: 3.829060,
      longitude: 11.476053,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  ]
  


  const goToMyPossition = () => {
    handleChangeRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0004757,
      longitudeDelta: 0.0006866
    })
  }

  if (!location) {
    return <Text>Chargement</Text>;
  }
  return (
    <View style={styles.container}>
      {console.log("test")}
      <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0004757,
          longitudeDelta: 0.0006866
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0004757,
          longitudeDelta: 0.0006866
        }}
        ref={(ref) => setMapviewRef(ref)}
      // onRegionChange={()=>console.log("test2")}

      >
        <View style={{
          backgroundColor:"green",
          height:100,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Marker
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            title={'Le chauffeur'}
            pinColor="red"
          // image={require('../../../assets/images/marqueurbus.webp')}
          >
            <Image
              source={require('../../../assets/images/marqueurbus.webp')}
              style={{ height: 80, width: 80, resizeMode: 'center', resizeMethod: "resize" }}

            />
            {/* <AntDesign name="caretup" size={100} color="green" /> */}
          </Marker>
        </View>

        <Marker
          coordinate={{
            latitude: parseFloat(enfants.ramassage[0].latitude),
            longitude: parseFloat(enfants.ramassage[0].lontidute),
          }}
          title={enfants.nom}
          pinColor="red"
          icon={() => <Ionicons name='home' size={50} color={'red'} />}
        // image={{ uri: `https://r2sbackend-1.onrender.com/${item.photo}` }}
        >
          <Image
            source={{ uri: `https://r2sbackend-1.onrender.com/${enfants.photo}` }}
            style={{ height: 50, width: 50, resizeMode: 'contain', borderRadius: 50 }}

          />
        </Marker>

        <Polyline coordinates={route} strokeColor="black" strokeWidth={10} />
      </MapView>
      <Button style={styles.button} title={`Aller a ma position ${valu}` } onPress={goToMyPossition} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  button: {
    marginBottom: 50
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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

