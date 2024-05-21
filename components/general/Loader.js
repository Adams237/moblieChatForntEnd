import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet ,Text } from 'react-native';

export default function Loader({message}) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 150,
          height: 150,
          transform: [{ rotate: spin }],
        }}
        source={require('../../assets/images/load-logo.png')}
      />
      <Text>
      {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
