import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, View } from 'react-native';

function CustomCarousel({ data, renderItem, widthRatio = 1, heightRatio = 0.5 }) {
  const width = Dimensions.get('window').width * widthRatio;
  const height = Dimensions.get('window').height * heightRatio;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
}

export default CustomCarousel;
