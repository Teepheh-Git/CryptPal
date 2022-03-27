import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FONTS, SIZES } from "../../constants";
import { connect } from "react-redux";

const OnBoardingItem = ({ item, appTheme }) => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.img} resizeMode={"cover"} source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({

  wrapper: {
    width: SIZES.width * 0.95,
    height: SIZES.height * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: SIZES.width,
    height: SIZES.width,
    // marginVertical: 20,
    top: 25,
  },
  title: {
    ...FONTS.h5,
    color: "white",
    width: SIZES.width * 0.85,
    textAlign: "center",
  },
});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingItem);

