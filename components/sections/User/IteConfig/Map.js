import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapRoutes = ({ origin, destination }) => {
  const [route, setRoute] = useState([]);
  const originLocation = { latitude: origin?.lat ?? 0, longitude: origin?.lng ?? 0 };
  const destinationLocation = { latitude: destination?.lat ?? 0, longitude: destination?.lng ?? 0 };
  const mapRef = useRef(null)
const [strokeWidth , setstrokeWidth] = useState(4)
  const [strokeColor, setstrokeColor] = useState('red')
  useEffect(() => {
    if (originLocation && destinationLocation) {
      setRoute([originLocation, destinationLocation]);
      console.log('originLocation', originLocation);
      console.log('destinationLocation', destinationLocation);
    }
  }, [origin, destination]);

  const mapRegion = {
    latitude: originLocation.latitude,
    longitude: originLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}
      ref={mapRef}
      
          // onRegionChange={(region)=>console.log(region)}
      >
        <Marker
          coordinate={{
            latitude: originLocation.latitude,
            longitude: originLocation.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
            
          }}
           
          pinColor="blue"
          icon={()=><Ionicons name='home'  size={50} color={'red'}/>}
          title='Point de ramassage'
         image={require('../../../../assets/images/icon-car.png')}        />
        
          <Marker
          coordinate={{
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude,
          }}
         title='Ecole de Douala'
          pinColor="blue"
          image={require('../../../../assets/images/icon-car.png')}

         />
        { route.length >0 && <Polyline coordinates={route}  strokeWidth={strokeWidth} 
        strokeColor= {'red'} />}
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
  
  markerImage: {
    width: 10, // spécifiez la largeur désirée de l'image
    height: 10, 
    display: "none"
    // spécifiez la hauteur désirée de l'image
  },
});







export default MapRoutes











