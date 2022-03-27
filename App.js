import React, { useEffect, useState } from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import AppRoute from "./router/AppRoute";
import OnBoardingRoute from "./router/OnBoardingRoute";
import { ActivityIndicator, StatusBar, TouchableOpacity, View } from "react-native";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./src/stores/rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS } from "./src/constants";

TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

enableScreens(true);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

const persistor = persistStore(store);

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


  const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLORS.primary }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 20,
          fontFamily: "PublicaSansRound-Rg",
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: "PublicaSansRound-Rg",
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),


  };

  return (


    <GestureHandlerRootView style={{ flex: 1 }}>


      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>



          <BottomSheetModalProvider>

            <NavigationContainer>
              {loading ? <Loading /> : viewedOnboarding ? <AppRoute /> : <OnBoardingRoute />}
            </NavigationContainer>
            <Toast config={toastConfig} />

          </BottomSheetModalProvider>

        </PersistGate>


      </Provider>


    </GestureHandlerRootView>

  );
};

export default App;
