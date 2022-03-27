import React from "react";
import OnBoarding from "../src/screens/OnBoarding";
import BottomTabs from "../src/navigation";
import CoinDetails from "../src/screens/CoinDetails";
import Search from "../src/screens/Search";
import TopMovers from "../src/screens/TopMovers";
import NewsWebPage from "../src/screens/NewsWebPage";
import MarketTrends from "../src/screens/MarketTrends";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchCoinDetails from "../src/screens/SearchCoinDetails";
import NewsContentPage from "../src/screens/NewsContentPage";

// const Stack = createStackNavigator();

const Stack = createNativeStackNavigator();


const OnBoardingRoute = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CoinDetails" component={CoinDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchCoinDetails" component={SearchCoinDetails} />
      <Stack.Screen name="TopMovers" component={TopMovers} />
      <Stack.Screen name="NewsWebPage" component={NewsWebPage} />
      <Stack.Screen name="MarketTrends" component={MarketTrends} />
      <Stack.Screen name="NewsContentPage" component={NewsContentPage} />
    </Stack.Navigator>
  );
};

export default OnBoardingRoute;

