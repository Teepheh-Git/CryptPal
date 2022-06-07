import React from 'react';
import {BackHandler} from 'react-native';

export const BackPressHandler = callback => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    callback();
    return true;
  });
};
