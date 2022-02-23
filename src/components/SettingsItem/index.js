import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";

const SettingsItem = ({ appTheme, icon, title, onPress }) => {


  return (
    <Pressable activeOpacity={0.9} style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}
               onPress={onPress}>

      <Image resizeMode={"contain"} source={icon} style={styles.icon} />

      <Text style={styles.title}>{title}</Text>

      <Image source={icons.arr_right} style={styles.icon} />



    </Pressable>
  );
};


const styles = StyleSheet.create({

  container: {
    width: SIZES.width * 0.9,
    height: 75,
    paddingHorizontal: 15,
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 15,
    // elevation: 3,
    shadowOpacity: 0.02,
    shadowColor: "#B0B7C3",
    shadowOffset: {
      width: 0,
      height: 0,
    },

  },
  icon: {
    width: 25,
    height: 25,
  },
  title:{
    ...FONTS.body2,
    width:"70%"
  }

});

export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    // error: state.currencyReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsItem);
