import React, { useState, useEffect } from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppRoute from './router/AppRoute';
import OnBoardingRoute from './router/OnBoardingRoute';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './src/stores/rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
)

const persistor = persistStore(store)

const Loading = () => {
  return (
    <View >
      <ActivityIndicator size={'large'} />
    </View >
  )

}

const App = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    SplashScreen.hide();
    CheckOnboarding();
  }, [])


  const CheckOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding')
      if (value !== null) {
        setViewedOnboarding(true)
      }

    } catch (error) {
      console.log('Error @CheckOnboarding: ', error)

    } finally {
      setLoading(false)
    }
  }



  return (

    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>

        <NavigationContainer>
          {loading ? <Loading /> : viewedOnboarding ? <AppRoute /> : <OnBoardingRoute />}
        </NavigationContainer>
      </PersistGate>

    </Provider>
  );
};

export default App;
