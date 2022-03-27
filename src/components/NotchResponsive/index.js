// @flow
import React from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import * as Safety from "react-native-safe-area-context";
import { connect } from "react-redux";

const NotchResponsive = ({ color, appTheme }) => {
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


export function mapStateToProps(state) {
  return {
    // coins: state.marketReducer.coins,
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    // error: state.currencyReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NotchResponsive);
