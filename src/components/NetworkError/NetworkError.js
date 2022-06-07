import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants/';
import LinearGradient from 'react-native-linear-gradient';

const NetworkError = ({onPress}) => {
  return (
    <View style={styles.networkErrorContainer}>
      <Image
        style={{height: 98, width: 98}}
        source={require('../../assets/images/ExpressionLess.png')}
      />
      <Text style={[styles.networkErrorText, {color: appTheme.textColor}]}>
        Network error!!{' '}
      </Text>
      <Text style={[styles.networkErrorDesc, {color: appTheme.textColor3}]}>
        Your network is asleep, please check your internet connections and click
        refresh.
      </Text>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <LinearGradient
          style={styles.refreshButton}
          colors={['#4F36C4', '#4F36C4']}>
          <Text style={styles.refresh}>Refresh</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default NetworkError;

const styles = StyleSheet.create({
  networkErrorContainer: {
    width: SIZES.width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    top: SIZES.height * 0.2,
  },
  networkErrorText: {
    ...FONTS.h4,
    marginVertical: 5,
  },
  networkErrorDesc: {
    ...FONTS.body4,
    textAlign: 'center',
  },
  refresh: {
    color: COLORS.white,
    ...FONTS.h5,
  },
});
