import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {FONTS, SIZES} from '../../constants';
import {connect} from 'react-redux';

const OnBoardingItem = ({item, index, scrollX}) => {
  const inputRange = [
    (index - 1) * SIZES.width,
    index * SIZES.width,
    (index + 1) * SIZES.width,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.wrapper}>
      <View>
        <Animated.Image
          style={[styles.img, {transform: [{scale}]}]}
          resizeMode={'cover'}
          source={item.image}
        />
      </View>

      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: SIZES.width * 0.95,
    height: SIZES.height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    // backgroundColor: 'red',
    width: SIZES.width,
    height: SIZES.width,
    // marginVertical: 20,
    // top: 25,
  },
  title: {
    ...FONTS.h5,
    color: 'white',
    width: SIZES.width * 0.85,
    textAlign: 'center',
  },
});

export default OnBoardingItem;
