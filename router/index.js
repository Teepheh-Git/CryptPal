import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import OnBoarding from '../src/screens/OnBoarding';
import BottomTabs from '../src/navigation/';
import Settings from '../src/screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import CoinDetails from '../src/screens/CoinDetails';





const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="CoinDetails" component={CoinDetails} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
