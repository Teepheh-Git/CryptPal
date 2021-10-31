import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux'

const NewsWebPage = ({ appTheme, navigation, route }) => {

    const dataFromNewsPage = route.params

    const [visible, setVisible] = useState(false)


    const Loading = () => {


        return (
            <View style={[styles.loadingIndicator, { backgroundColor: appTheme.backgroundColor }]}>

                {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop /> : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')} autoPlay loop />}


            </View>

        )


    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
            <WebView

                source={{ uri: `https://${dataFromNewsPage.domain}` }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoadEnd={() => setVisible(false)}

            />

            {visible ? <Loading /> : null}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    loadingIndicator: {
        flex: 1,
        position: 'absolute',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsWebPage);