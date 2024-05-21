import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import haversine from 'haversine';
import {set , push , ref } from 'firebase/database';
import { db } from './../../../backend/firebaseConfig';
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

export default function Driver() {
  const [location, setLocation] = useState(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState(null);

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLatLng, setPrevLatLng] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    
    


    const watchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    const updateLocation = (position) => {
  const { latitude, longitude } = position.coords;
  const newCoordinate = { latitude, longitude };
  const dataRef = ref(db, 'location/chauffeur1')
  set(dataRef, newCoordinate).then(() => {console.log('hhhh')})

  mapRef.current.animateCamera({
    center: newCoordinate,
    zoom: 15,
  });

  setRouteCoordinates(prevCoordinates => [...prevCoordinates, newCoordinate]);
  setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate));
  setPrevLatLng(newCoordinate);
};


      const locationListener = await Location.watchPositionAsync(
         {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 60000,
    distanceInterval: 1,
  },
  updateLocation
  );

      return () => {
        if (locationListener) {
          locationListener.remove();
        }
      };
    };

    watchLocation();
  }, [routeCoordinates, distanceTravelled]);

  const calcDistance = newLatLng => {
    return haversine(prevLatLng, newLatLng) || 0;
  };

  const getMapRegion = () => {
    if (routeCoordinates.length > 0) {
      const { latitude, longitude } = routeCoordinates[routeCoordinates.length - 1];
      return {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        followsUserLocation
        loadingEnabled
        region={getMapRegion()}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
    
      </MapView>
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <Text>{parseFloat(distanceTravelled).toFixed(2)} km</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
