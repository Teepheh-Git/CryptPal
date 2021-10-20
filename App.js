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



const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const Loading = () => {

  return (
    <View >
      <ActivityIndicator size={'large'} />
    </View >
  )

}

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const [viewedOnboarding, setViewedOnboarding] = useState(false)
  const [loading, setLoading] = useState(true)











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

  useEffect(() => {
    CheckOnboarding();
  }, [])







  return (

    <Provider store={store}>

      <NavigationContainer>


        {loading ? <Loading /> : viewedOnboarding ? <AppRoute /> : <OnBoardingRoute />}




      </NavigationContainer>
    </Provider>
  );
};

export default App;
