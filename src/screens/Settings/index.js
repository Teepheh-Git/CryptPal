import React, { useCallback, useMemo, useRef, useState } from "react";
import { Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/theme/themeActions";
import { toggleCurrency } from "../../stores/currency/currencyActions";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import SettingsItem from "../../components/SettingsItem";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import constants from "../../constants/constants";
import Toast from "react-native-toast-message";
import Clipboard from "@react-native-clipboard/clipboard";
import { toggleLaunch } from "../../stores/launch/launchActions";
import NotchResponsive from "../../components/NotchResponsive";


const Settings = ({ appTheme, appCurrency, toggleTheme, toggleCurrency, toggleLaunch, appLaunch }) => {


  const [togSwitch, setTogSwitch] = useState(false);
  const [tabStatus, setTabStatus] = useState(appCurrency.ticker);
  const [launchStatus, setLaunchStatus] = useState(appLaunch.name);

  const copyToClipboard = async (address) => {
    await Clipboard.setString(`${address}`);
    await Toast.show({
      type: "success",
      text1: address,
      text2: "Copied to clipboard",
    });
  };


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

  const setTabStatusLaunch = (tabStatus) => {
    setLaunchStatus(tabStatus);
  };


  return (
    <>



      <NotchResponsive color={appTheme.backgroundColor2} />

      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>


        <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: appTheme.textColor }]}>Settings ⚙️</Text>
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
            title={"Dark Mode"} />


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
          style={{ padding: SIZES.font9 }}
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
          style={{ padding: SIZES.font9 }}
          backgroundStyle={{
            backgroundColor: appTheme.backgroundColor,
            borderTopRightRadius: 54,
            borderTopLeftRadius: 54,
          }}>
          {ModalTitle("        Change Launch Screen", () => launchScreenSheetModalRef.current?.close())}
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            {constants.launchList.map((buttonLabel, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.btnTab, launchStatus === buttonLabel.launchStatus && styles.btnTabActive]}
                onPress={() => {
                  setTabStatusLaunch(buttonLabel.label);
                  toggleLaunch(buttonLabel.value);
                  launchScreenSheetModalRef.current?.close();
                  // console.log(buttonLabel.value);
                }}>
                <Text
                  style={[styles.textTab, { color: appTheme.textColor }, launchStatus === buttonLabel.launchStatus && styles.textTabActive]}>{buttonLabel.label}</Text>
              </TouchableOpacity>
            ))}
          </BottomSheetScrollView>
        </BottomSheetModal>


        {/*ABOUT BOTTOM SHEET MODAL*/}
        <BottomSheetModal
          ref={aboutBottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          style={{ padding: SIZES.font9 }}
          backgroundStyle={{
            backgroundColor: appTheme.backgroundColor,
            borderTopRightRadius: 54,
            borderTopLeftRadius: 54,
          }}>
          {ModalTitle("        About", () => aboutBottomSheetModalRef.current?.close())}
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View style={[styles.modalInnerBox, {
              shadowColor: appTheme.textColor,
              backgroundColor: appTheme.backgroundColor,
            }]}>


              <Text style={[styles.about, { color: appTheme.textColor }]}>CryptPal is a design solution that helps user
                easily monitor the cryptocurrency market with ease. With
                CryptPal features, users can create price notifications of any crypto asset of their choice.</Text>

              <Text style={[styles.about, { marginVertical: 10, alignSelf: "flex-end", color: appTheme.textColor }]}>Version:
                1.1.0</Text>

            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>


        {/*SUPPORT BOTTOM SHEET MODAL*/}
        <BottomSheetModal
          ref={supportBottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          style={{ padding: SIZES.font9 }}
          backgroundStyle={{
            backgroundColor: appTheme.backgroundColor,
            borderTopRightRadius: 54,
            borderTopLeftRadius: 54,
          }}>
          {ModalTitle("        Support", () => supportBottomSheetModalRef.current?.close())}
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View style={[styles.modalInnerBox, {
              shadowColor: appTheme.textColor,
              backgroundColor: appTheme.backgroundColor,
              height: SIZES.height * 0.3,

            }]}>


              <Text style={[styles.about, { color: appTheme.textColor }]}>Hey! ☺️, you can show some support by buying
                us
                a coffee ☕️ through any of our wallet address below. Sipping our hot coffee in advance.
                Thanks❤️.</Text>


              <View style={{ marginTop: SIZES.height * 0.02 }}>

                <Text style={{ ...FONTS.body9, color: appTheme.textColor3 }}>Tap to Copy</Text>

                <Text style={[styles.address, { color: appTheme.textColor }]}
                      onPress={() => copyToClipboard("bc1qpvc2kl02s3rv94aakg83e2kvlksuuj6xssmzp8")}>BTC:
                  bc1qpvc2kl02s3rv94aakg83e2kvlksuuj6xssmzp8 </Text>
                <Text style={[styles.address, { color: appTheme.textColor }]}
                      onPress={() => copyToClipboard("0x1b360546283Ec5fF95806279fc930157F42104aD")}>ETH:
                  0x1b360546283Ec5fF95806279fc930157F42104aD</Text>
                <Text style={[styles.address, { color: appTheme.textColor }]}
                      onPress={() => copyToClipboard("TJCYx6oktuy9zm4sebn9pLgMcVdweTB4YY")}>TRX:
                  TJCYx6oktuy9zm4sebn9pLgMcVdweTB4YY</Text>
              </View>

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
              backgroundColor: appTheme.backgroundColor,
              justifyContent: "center",
              alignItems: "center",
            }]}>


              <Text style={[styles.about, { color: appTheme.textColor }]}>App is currently up to date 👍🏼</Text>

            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>


      </View>
    </>


  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,

  },
  headerContainer: {
    height: SIZES.font1 * 1.4,
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
    ...FONTS.h6,
    marginHorizontal: 5,
  },
  centeredView: {
    flex: 1,
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
    ...FONTS.h6,
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
    marginRight: SIZES.font5,
    marginVertical: 5,
    borderWidth: 0.5,
    alignItems: "flex-start",
    borderColor: COLORS.grey,
    borderRadius: 10,
    paddingLeft: SIZES.font8,
    justifyContent: "center",

  },
  textTab: {
    ...FONTS.body7,
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
    height: SIZES.height * 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,

  },
  about: {
    ...FONTS.body9,
    opacity: 0.8,

  },
  address: {
    ...FONTS.body10,
    marginVertical: SIZES.height * 0.009,
    textDecorationLine: "underline",
  },


});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    appLaunch: state.launchReducer.appLaunch,

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
    toggleLaunch: launchType => {
      return dispatch(toggleLaunch(launchType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
