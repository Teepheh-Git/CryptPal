import React from 'react'
import { StyleSheet } from 'react-native'
import OnBoarding from '../src/screens/OnBoarding';
import BottomTabs from '../src/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import CoinDetails from '../src/screens/CoinDetails';
import Search from '../src/screens/Search';
import TopMovers from '../src/screens/TopMovers';
import NewsWebPage from '../src/screens/NewsWebPage';
import MarketTrends from '../src/screens/MarketTrends';





const Stack = createStackNavigator();

const AppRoute = () => {
    return (
        <Stack.Navigator
            detachInactiveScreens
            screenOptions={{
                headerShown: false,
                // animationEnabled: false
            }}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="CoinDetails" component={CoinDetails} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="TopMovers" component={TopMovers} />
            <Stack.Screen name="NewsWebPage" component={NewsWebPage} />
            <Stack.Screen name="MarketTrends" component={MarketTrends} />
        </Stack.Navigator>
    )
}

export default AppRoute

const styles = StyleSheet.create({})
