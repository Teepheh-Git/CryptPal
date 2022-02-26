import React, { useCallback, useMemo, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/theme/themeActions";
import { toggleCurrency } from "../../stores/currency/currencyActions";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import SettingsItem from "../../components/SettingsItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import constants from "../../constants/constants";

const Settings = ({ appTheme, appCurrency, toggleTheme, toggleCurrency }) => {


  const [currency, setCurrency] = useState(appCurrency.name);
  const [togSwitch, setTogSwitch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCoin, setModalCoin] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalCoinInfo, setModalCoinInfo] = useState({});
  const [tabStatus, setTabStatus] = useState(appCurrency.ticker);


  function toggleThemeHandler() {
    toggleTheme(appTheme.name === "light" ? "dark" : "light");
  }


  // refs
  const bottomSheetModalRef = useRef(null);
  const launchScreenSheetModalRef = useRef(null);
  const aboutBottomSheetModalRef = useRef(null);
  const supportBottomSheetModalRef = useRef(null);
  const updateBottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);


  const openCurrencyModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  const openLaunchScreenModal = useCallback(() => {
    launchScreenSheetModalRef.current?.present();
  }, []);


  const openAboutModal = useCallback(() => {
    aboutBottomSheetModalRef.current?.present();
  }, []);

  const openSupportModal = useCallback(() => {
    supportBottomSheetModalRef.current?.present();
  }, []);

  const openUpdateModal = useCallback(() => {
    updateBottomSheetModalRef.current?.present();
  }, []);


  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.9}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  function ModalTitle(modalTitle, onPress) {

    return (
      <View style={[styles.changeCurrencyContainer, { backgroundColor: appTheme.backgroundColor }]}>

        <Text style={[styles.changeCurrencyTitle, { color: appTheme.textColor }]}>{modalTitle}</Text>
        <Pressable onPress={onPress}>
          <Image source={icons.Close} style={{ width: 30, height: 30 }} />
        </Pressable>
      </View>
    );
  }


  const setTabStatusFilter = (tabStatus) => {
    setTabStatus(tabStatus);

  };


  return (

    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: appTheme.textColor }]}>Settings ⚙</Text>
        </View>
      </View>


      <View>
        <SettingsItem onPress={openLaunchScreenModal} icon={icons.HomeIcon} title={"Launch Screen"} />

        <SettingsItem
          trackColor={{ false: "#EEF1F5", true: COLORS.primary }}
          thumbColor={togSwitch ? COLORS.white : COLORS.white}
          ios_backgroundColor="#EEF1F5"
          check switchValue={togSwitch} onSwitchChange={(value) => {
          setTogSwitch(value);
          toggleThemeHandler();
        }} icon={icons.darkMode}
          title={togSwitch ? "Dark Mode" : "Light Mode"} />


        <SettingsItem currencyLabel={true} currentCurrency={appCurrency.ticker} onPress={openCurrencyModal}
                      icon={icons.Ticket} title={"Default Currency"} />
        <SettingsItem onPress={openSupportModal} icon={icons.buyCoffee} title={"Support"} />
        <SettingsItem onPress={openAboutModal} icon={icons.Document} title={"About"} />
        <SettingsItem onPress={openUpdateModal} icon={icons.chkUpdate} title={"Check for Update"} />


      </View>


      {/*CHANGE CURRENCY BOTTOM SHEET MODAL*/}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{ padding: 20 }}
        backgroundStyle={{
          backgroundColor: appTheme.backgroundColor,
          borderTopRightRadius: 54,
          borderTopLeftRadius: 54,
        }}>
        {ModalTitle("    Change Default Currency", () => bottomSheetModalRef.current?.close())}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {constants.currencyList.map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
              onPress={() => {
                setTabStatusFilter(buttonLabel.label);
                toggleCurrency(buttonLabel.value);
                bottomSheetModalRef.current?.close();
                // console.log(buttonLabel.value);
              }}>
              <Text
                style={[styles.textTab, { color: appTheme.textColor }, tabStatus === buttonLabel.tabStatus && styles.textTabActive]}>{buttonLabel.label}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>


      {/*LAUNCH SCREEN BOTTOM SHEET MODAL*/}
      <BottomSheetModal
        ref={launchScreenSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{ padding: 20 }}
        backgroundStyle={{
          backgroundColor: appTheme.backgroundColor,
          borderTopRightRadius: 54,
          borderTopLeftRadius: 54,
        }}>
        {ModalTitle("        Change Launch Screen", () => launchScreenSheetModalRef.current?.close())}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View>


          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>


      {/*ABOUT BOTTOM SHEET MODAL*/}
      <BottomSheetModal
        ref={aboutBottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{ padding: 20 }}
        backgroundStyle={{
          backgroundColor: appTheme.backgroundColor,
          borderTopRightRadius: 54,
          borderTopLeftRadius: 54,
        }}>
        {ModalTitle("        About", () => aboutBottomSheetModalRef.current?.close())}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={[styles.modalInnerBox, {
            shadowColor: appTheme.textColor,
            backgroundColor: appTheme.backgroundColor2,
          }]}>


            <Text style={[styles.about, { color: appTheme.textColor }]}>CryptPal is a design solution that helps user
              easily monitor the cryptocurrency market with ease. With
              CryptPal features, users can create price notifications of any crypto asset of their choice.</Text>

            <Text style={[styles.about, { marginVertical: 10, alignSelf: "flex-end", color: appTheme.textColor }]}>Version:
              1.0.0</Text>

          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>


      {/*SUPPORT BOTTOM SHEET MODAL*/}
      <BottomSheetModal
        ref={supportBottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{ padding: 20 }}
        backgroundStyle={{
          backgroundColor: appTheme.backgroundColor,
          borderTopRightRadius: 54,
          borderTopLeftRadius: 54,
        }}>
        {ModalTitle("        Support", () => supportBottomSheetModalRef.current?.close())}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={[styles.modalInnerBox, {
            shadowColor: appTheme.textColor,
            backgroundColor: appTheme.backgroundColor2,
          }]}>


            <Text style={[styles.about, { color: appTheme.textColor }]}>Hey! ☺️, you can show some support by buying us
              a coffee ☕️ through our eth address “0xasasdasdcxcxasdasd”. Sipping our hot coffee in advance.
              Thanks❤️.</Text>

          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>


      {/*UPDATE BOTTOM SHEET MODAL*/}
      <BottomSheetModal
        ref={updateBottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={{ padding: 20 }}
        backgroundStyle={{
          backgroundColor: appTheme.backgroundColor,
          borderTopRightRadius: 54,
          borderTopLeftRadius: 54,
        }}>
        {ModalTitle("        Check for Update", () => updateBottomSheetModalRef.current?.close())}
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={[styles.modalInnerBox, {
            shadowColor: appTheme.textColor,
            backgroundColor: appTheme.backgroundColor2,
            justifyContent:"center",
            alignItems:"center"
          }]}>


            <Text style={[styles.about, { color: appTheme.textColor }]}>App is currently up to date 👍🏼</Text>

          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>


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
    alignSelf: "center",
    backgroundColor: "rgba(107,85,208,0.16)",
    // zIndex:100

  },
  modalView: {
    width: SIZES.width * 0.9,
    height: SIZES.width * 0.8,
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
    // zIndex: 1000000000,

  },
  changeCurrencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,


  },
  changeCurrencyTitle: {
    ...FONTS.h2,
    width: "90%",
    alignSelf: "center",
    alignItems: "flex-end",
    textAlign: "center",
    // backgroundColor:'cyan'
  },
  listTab: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    width: SIZES.width * 0.9,
    // alignItems: "flex-end",
    // backgroundColor:'red',
    marginBottom: 10,
    // elevation: 0.3,
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },
  },
  btnTab: {
    height: SIZES.height * 0.07,
    width: "100%",
    // marginHorizontal: 5,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    alignItems: "flex-start",
    borderColor: COLORS.grey,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",

  },
  textTab: {
    ...FONTS.body2,
    marginHorizontal: 10,
    color: COLORS.grey,
    letterSpacing: 1,
  },
  btnTabActive: {
    // backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 2,

  },
  modalInnerBox: {
    width: "99%",

    height: SIZES.height * 0.23,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 10,
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,

  },
  about: {
    ...FONTS.body2,
    opacity: 0.8,

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
