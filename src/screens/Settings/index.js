import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    useState
} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { toggleTheme } from '../../stores/theme/themeActions';




const Settings = ({ appTheme, toggleTheme }) => {


    function toggleThemeHandler() {
        if (appTheme.name === 'light') {
            toggleTheme('dark');
        } else {
            toggleTheme('light');
        }
    }


    const ClearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')

        } catch (error) {
            console.log('Error @clearOnboarding: ', error)

        }

    }


    return (
        <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>


            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 10 }}
                onPress={() => toggleThemeHandler()}>
                <Text>Toggle Theme </Text>

            </TouchableOpacity>


            <TouchableOpacity
                style={{ height: 60, width: "50%", backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => ClearOnboarding()}>
                <Text>Reset Onboarding </Text>

            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})




export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: themeType => {
            return dispatch(toggleTheme(themeType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);