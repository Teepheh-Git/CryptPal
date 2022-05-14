import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { connect, useSelector } from "react-redux";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import * as Animatable from "react-native-animatable";



const CustomHeader = ({ title, onPress, image }) => {
  const { appTheme } = useSelector(state => state.themeReducer);

  return (
    <Animatable.View useNativeDriver={true} duration={500} animation={"slideInRight"} style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <Pressable
        style={[styles.backArrowContainer, { backgroundColor: appTheme.backgroundColor }]}
        onPress={onPress}>
        <Image style={[styles.backArrow, { tintColor: appTheme.textColor2 }]} source={icons.backArrow} />

      </Pressable>


      <View style={styles.overviewContainer}>

        <Text style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>
        <Image style={styles.overviewImage} source={image} />
      </View>


    </Animatable.View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height * 0.07,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  backArrowContainer: {
    width: SIZES.font1 * 1.2,
    height: SIZES.font1 * 1.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderColor: COLORS.grey,

  },
  backArrow: {
    width: SIZES.font3,
    height: SIZES.font3,

  },
  title: {
    ...FONTS.h6,
    marginHorizontal: 5,

  },
  overviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width * 0.8,
    justifyContent: "center",
    paddingRight: 30,


  },
  overviewImage: {
    width: 20,
    height: 20,
  },
});



export default CustomHeader;
