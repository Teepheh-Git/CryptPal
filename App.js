import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import AppRoute from "./router/AppRoute";
import OnBoardingRoute from "./router/OnBoardingRoute";
import { ActivityIndicator, StatusBar, TouchableOpacity, View } from "react-native";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { persistor, store } from "./src/stores/store";
import constants from "./src/constants/constants";


TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

enableScreens(true);


const Loading = () => {
  return (
    <View>
      <ActivityIndicator size={"large"} />
    </View>
  );

};

const App = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    CheckOnboarding();
  }, []);


  const CheckOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @CheckOnboarding: ", error);

    } finally {
      setLoading(false);
    }
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar
            translucent={true}
            showHideTransition={"fade"}
            backgroundColor={"transparent"}
          />
          <BottomSheetModalProvider>
            <NavigationContainer>
              {loading ? <Loading /> : viewedOnboarding ? <AppRoute /> : <OnBoardingRoute />}
            </NavigationContainer>
            <Toast config={constants.toastConfig} />
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
