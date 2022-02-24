import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/theme/themeActions";
import { toggleCurrency } from "../../stores/currency/currencyActions";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import SettingsItem from "../../components/SettingsItem";


const Settings = ({ appTheme, appCurrency, toggleTheme, toggleCurrency }) => {


  const [currency, setCurrency] = useState(appCurrency.name);

  function toggleThemeHandler() {
    if (appTheme.name === "light") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }


  const ClearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log("Error @clearOnboarding: ", error);
    }
  };

  const ClearFavorites = async () => {
    try {
      await AsyncStorage.removeItem("FavoriteCoin");
    } catch (error) {
      console.log("Error Favorite: ", error);
    }
  };


  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {

      fontSize: 16,
      left: 5,
      top: 5,
      paddingVertical: 10,
      paddingHorizontal: 10,
      // borderWidth: 1,
      fontWeight: "bold",
      // borderColor: appTheme.textColor2,
      borderRadius: 5,
      color: "white",
      backgroundColor: COLORS.primary,
      paddingRight: 35, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: "purple",
      borderRadius: 8,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
      top: SIZES.height * 0.024,
      right: 15,
    },
  });


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: appTheme.textColor }]}>Settings ⚙️</Text>
        </View>
      </View>


      <SettingsItem onPress={() => toggleThemeHandler()} icon={icons.Show} title={"Appearance"} />
      <SettingsItem icon={icons.HomeIcon} title={"Launch Screen"} />
      <SettingsItem icon={icons.Ticket} title={"Default Currency"} />
      <SettingsItem icon={icons.aboutIcon} title={"Language"} />
      <SettingsItem icon={icons.Document} title={"NewsLetter"} />
      <SettingsItem icon={icons.ShieldDone} title={"About"} />


      {/*<RNPickerSelect*/}
      {/*  value={currency}*/}
      {/*  style={pickerSelectStyles}*/}
      {/*  onValueChange={(value, itemIndex) => {*/}
      {/*    setCurrency(value);*/}
      {/*    // console.log(value)*/}
      {/*    if (value !== null) {*/}
      {/*      toggleCurrency(value);*/}
      {/*    }*/}

      {/*  }}*/}
      {/*  items={constants.currencyList}*/}
      {/*  Icon={() => {*/}
      {/*    return <Chevron size={1.5} color={"white"} />;*/}
      {/*  }}*/}
      {/*/>*/}


      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    height: 60,*/}
      {/*    width: "50%",*/}
      {/*    backgroundColor: "grey",*/}
      {/*    justifyContent: "center",*/}
      {/*    alignItems: "center",*/}
      {/*    borderRadius: 10,*/}
      {/*    marginVertical: 10,*/}
      {/*  }}*/}
      {/*  onPress={() => toggleThemeHandler()}>*/}
      {/*  <Text>Toggle Theme </Text>*/}

      {/*</TouchableOpacity>*/}


      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    height: 60,*/}
      {/*    width: "50%",*/}
      {/*    backgroundColor: "grey",*/}
      {/*    justifyContent: "center",*/}
      {/*    alignItems: "center",*/}
      {/*    borderRadius: 10,*/}
      {/*  }}*/}
      {/*  onPress={() => ClearOnboarding()}>*/}
      {/*  <Text>Reset Onboarding </Text>*/}

      {/*</TouchableOpacity>*/}

      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    height: 60,*/}
      {/*    width: "50%",*/}
      {/*    backgroundColor: "grey",*/}
      {/*    justifyContent: "center",*/}
      {/*    alignItems: "center",*/}
      {/*    borderRadius: 10,*/}
      {/*  }}*/}
      {/*  onPress={() => ClearFavorites()}>*/}
      {/*  <Text>Clear Favorites </Text>*/}

      {/*</TouchableOpacity>*/}


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    // justifyContent: "center",
  },
  headerContainer: {
    height: 55,
    width: SIZES.width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: SIZES.width * 0.775,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...FONTS.h2,
    marginHorizontal: 5,
  },
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
  return {
    toggleTheme: themeType => {
      return dispatch(toggleTheme(themeType));
    },
    toggleCurrency: currencyType => {
      return dispatch(toggleCurrency(currencyType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
