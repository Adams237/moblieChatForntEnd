import React, { useEffect, useState } from 'react';
import * as Location from "expo-location";
import { push, ref, set } from 'firebase/database';
import { db } from '../../../backend/firebaseConfig';

function MaPosition(props) {
  const [locationError, setLocationError] = useState()
  const [curentocation, setCurrentPosition] = useState()
  useEffect(() => {


    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Location permission denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        setInterval(() => {
          set(ref(db, 'location'), {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          })
          console.log({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          })
        }, 10000);

      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    getLocation();
  }, []);
  return (
    null
  );
}

export default MaPosition;