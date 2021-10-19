import React from 'react'
import { StyleSheet } from 'react-native'
import OnBoarding from '../src/screens/OnBoarding';
import BottomTabs from '../src/navigation/';
import { createStackNavigator } from '@react-navigation/stack';
import CoinDetails from '../src/screens/CoinDetails';
import Search from '../src/screens/Search';
import TopMovers from '../src/screens/TopMovers';





const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="CoinDetails" component={CoinDetails} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="TopMovers" component={TopMovers} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
