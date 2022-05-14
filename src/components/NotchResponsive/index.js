// @flow
import React from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import * as Safety from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const NotchResponsive = ({ color }) => {

  const { appTheme } = useSelector(state => state.themeReducer);

  return (
    <View>
      <StatusBar
        translucent={true}
        showHideTransition={"fade"}
        barStyle={appTheme.name === "light" ? "dark-content" : "light-content"}
      />
      {Platform.OS === "android" ? <Safety.SafeAreaView style={{ flex: 0, backgroundColor: color }} /> :
        <SafeAreaView style={{ flex: 0, backgroundColor: color }} />}
    </View>
  );
};


export default NotchResponsive;
