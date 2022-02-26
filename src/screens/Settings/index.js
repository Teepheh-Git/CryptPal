import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/theme/themeActions";
import { toggleCurrency } from "../../stores/currency/currencyActions";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import SettingsItem from "../../components/SettingsItem";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";
import  constants  from "../../constants/constants";
import axios from "axios";


const Settings = ({ appTheme, appCurrency, toggleTheme, toggleCurrency }) => {


  const [currency, setCurrency] = useState(appCurrency.name);
  const [togSwitch, setTogSwitch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCoin, setModalCoin] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalCoinInfo, setModalCoinInfo] = useState({});


  function toggleThemeHandler() {
    toggleTheme(appTheme.name === "light" ? "dark" : "light");
  }


  // const ClearOnboarding = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@viewedOnboarding");
  //   } catch (error) {
  //     console.log("Error @clearOnboarding: ", error);
  //   }
  // };

  // const ClearFavorites = async () => {
  //   try {
  //     await AsyncStorage.removeItem("FavoriteCoin");
  //   } catch (error) {
  //     console.log("Error Favorite: ", error);
  //   }
  // };


  // const pickerSelectStyles = StyleSheet.create({
  //   inputIOS: {
  //
  //     fontSize: 16,
  //     left: 5,
  //     top: 5,
  //     paddingVertical: 10,
  //     paddingHorizontal: 10,
      // borderWidth: 1,
      // fontWeight: "bold",
      // borderColor: appTheme.textColor2,
      // borderRadius: 5,
      // color: "white",
      // backgroundColor: COLORS.primary,
      // paddingRight: 35, // to ensure the text is never behind the icon
    // },
    // inputAndroid: {
    //   fontSize: 16,
    //   paddingHorizontal: 10,
    //   paddingVertical: 8,
  // {/*    borderWidth: 0.5,*/
  // }
  // {/*    borderColor: "purple",*/
  // }
  //     borderRadius: 8,
  //     color: "black",
  //     paddingRight: 30, // to ensure the text is never behind the icon
  //   },
  //   iconContainer: {
  //     top: SIZES.height * 0.024,
  //     right: 15,
  //   },
  // });




  {/*function CurrencyModal() {*/}

  {/*  return (*/}
  //     <View style={styles.centeredView}>
  //       <Modal
  //         animationType="slide"
  //         transparent={true}
  //         // onShow={getModalCoinInfo}
  //         visible={modalVisible}
  //         onRequestClose={() => {
  //           Alert.alert("Modal has been closed.");
  //           setModalVisible(!modalVisible);
  //         }}
  //       >
  //         <Pressable onPress={() => setModalVisible(!modalVisible)}
  //                    style={styles.centeredView}>
  //
  //
  //           <View style={[styles.modalView, { backgroundColor: appTheme.backgroundColor }]}>
  //           <ScrollView style={{backgroundColor:"cyan"}}>
  //
  //             {["usd", "yen", "ngn"].map((item, index)=>(
  //
  //               <View>
  //                 <Text>{item}</Text>
  {/*              </View>*/}

  {/*            ))}*/}

  //
  //
  //           </ScrollView>
  //           </View>
  //         </Pressable>
  //       </Modal>
  //     </View>
  //   );
  // }





  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: appTheme.textColor }]}>Settings ⚙</Text>
        </View>
      </View>


      <View>

        <SettingsItem

          trackColor={{false: "#EEF1F5", true: COLORS.primary}}
          thumbColor={togSwitch ? COLORS.white : COLORS.white}
          ios_backgroundColor="#EEF1F5"
          check switchValue={togSwitch} onSwitchChange={(value)=>{
          setTogSwitch(value)
          toggleThemeHandler()
        }} icon={icons.darkMode}
                      title={togSwitch?"Dark Mode":"Light Mode"} />
        <SettingsItem icon={icons.HomeIcon} title={"Launch Screen"} />
        <SettingsItem icon={icons.Ticket} onPress={()=>{
          console.log("shhow");
          setModalVisible(true)

        }} title={"Default Currency"} />


        <SettingsItem icon={icons.buyCoffee} title={"Support"} />
        <SettingsItem icon={icons.Document} title={"About"} />
        <SettingsItem icon={icons.chkUpdate} title={"Check for Update"} />
      </View>


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
      {/*    return <Image source={icons.arr_right} />;*/}
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
      {/*{ CurrencyModal()}*/}


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,

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
  centeredView: {
    flex: 1,
    // position:"absolute",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    alignSelf:"center",
    backgroundColor: "rgba(107,85,208,0.16)",
    // zIndex:100

  },
  modalView: {
    width:SIZES.width*0.9,
    height:SIZES.width*0.8,
    margin: 20,
    borderRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex:1000000000

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
