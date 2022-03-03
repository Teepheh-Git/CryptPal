import React from "react";
import { Image, Pressable, StyleSheet, Switch, Text } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";

const SettingsItem = ({
                        appTheme,
                        icon,
                        title,
                        onPress,
                        check,
                        switchValue,
                        onSwitchChange,
                        ios_backgroundColor,
                        trackColor,
                        thumbColor,
                        currencyLabel,
                        currentCurrency,
                      }) => {


  return (
    <Pressable style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}
               onPress={onPress}>

      <Image resizeMode={"contain"} source={icon}
             style={[styles.icon, { tintColor: appTheme.name === "dark" ? "white" : null }]} />

      <Text style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>


      {check ? <Switch
        // style={{backgroundColor:"red"}}
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={trackColor}
        thumbColor={thumbColor}
        ios_backgroundColor={ios_backgroundColor}
      /> : currencyLabel ? <Text style={[styles.currentCurrency,{color:appTheme.textColor}]}> {currentCurrency}</Text> : <Image source={icons.arr_right}
                                                                    style={[styles.icon, { tintColor: appTheme.name === "dark" ? "white" : "black" }]} />
      }


    </Pressable>
  );
};


const styles = StyleSheet.create({

  container: {
    width: SIZES.width * 0.9,
    height: SIZES.height*0.09,
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
  title: {
    ...FONTS.body3,
    // fontWeight:"normal",
    width: "70%",
  },
  currentCurrency:{
    ...FONTS.body3
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
