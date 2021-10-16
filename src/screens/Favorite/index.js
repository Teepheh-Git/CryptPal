import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'


const Favorite = ({ appTheme }) => {
    return (
        <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <Text>Favorite</Text>
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
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);