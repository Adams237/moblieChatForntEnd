import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);
  const [mapViewRef, setMapViewRef] = useState(null);
  const previousLocation = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const watchId = await Location.watchPositionAsync({}, (location) => {
        const shouldUpdate = !previousLocation.current ||
          Math.abs(location.coords.latitude - previousLocation.current.latitude) > 0.001 ||
          Math.abs(location.coords.longitude - previousLocation.current.longitude) > 0.001;

        if (shouldUpdate) {
          setLocation(location);
          previousLocation.current = location;
        }
      });

      return () => Location.removeWatchId(watchId);
    })();
  }, []);

  if (!location) {
    return null;
  }

  const handleRegionChange = (region) => {
    if (mapViewRef) {
      mapViewRef.animateToRegion(region, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        ref={(ref) => setMapViewRef(ref)}
        onRegionChange={handleRegionChange}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Ma position"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
