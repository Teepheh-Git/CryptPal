import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import BottomTabs from '../src/navigation';
import CoinDetails from '../src/screens/CoinDetails';
import Search from '../src/screens/Search';
import TopMovers from '../src/screens/TopMovers';
import OnBoarding from '../src/screens/OnBoarding';
import NewsWebPage from '../src/screens/NewsWebPage';
import MarketTrends from '../src/screens/MarketTrends';
import SearchCoinDetails from '../src/screens/SearchCoinDetails';
import SplashScreen from 'react-native-splash-screen';
import NewsContentPage from '../src/screens/NewsContentPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();

const AppRoute = () => {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CheckOnboarding();
  }, []);

  const CheckOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        console.log(value);
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log('Error @CheckOnboarding: ', error);
    } finally {
      setLoading(false);
      SplashScreen.hide();
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  const options = () => ({
    gestureEnabled: false,
    transitionSpec: {
      open: {animation: 'timing', config: {duration: 500}},
      close: {animation: 'timing', config: {duration: 500}},
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  });

  return (
    <Stack.Navigator
      detachInactiveScreens
      initialRouteName={viewedOnboarding === true ? 'BottomTabs' : 'OnBoarding'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
        // animationEnabled: false
      }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={options}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetails}
        options={options}
        sharedElements={(route, otherRoute, showing) => {
          // const {item} = route.params;
          return [route.params.image];
        }}
      />
      <Stack.Screen name="Search" component={Search} options={options} />
      <Stack.Screen
        name="SearchCoinDetails"
        component={SearchCoinDetails}
        options={options}
      />
      <Stack.Screen name="TopMovers" component={TopMovers} options={options} />
      <Stack.Screen
        name="NewsWebPage"
        component={NewsWebPage}
        options={options}
      />
      <Stack.Screen
        name="MarketTrends"
        component={MarketTrends}
        options={options}
      />
      <Stack.Screen
        name="NewsContentPage"
        component={NewsContentPage}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default AppRoute;
