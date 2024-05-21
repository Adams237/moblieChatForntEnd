import React from 'react';
import { View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { useFocusEffect } from '@react-navigation/native';

enableScreens();


const MySlide = ({content}) => {
  const positionX = React.useRef(new Animated.Value(1000)).current;

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = {
    transform: [{ translateX: positionX }],
  };

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(positionX, {
        toValue: 0,
        duration: config.duration,
        easing: config.easing,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(positionX, {
          toValue: 1000,
          duration: config.duration,
          easing: config.easing,
          useNativeDriver: true,
        }).start();
      };
    }, [positionX, config])
  );

  return (
    <Animated.View style={[styles.container, style]}>
       {content}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default MySlide;
