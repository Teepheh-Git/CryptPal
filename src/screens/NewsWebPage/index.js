import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader";

const NewsWebPage = ({ appTheme, navigation, route }) => {

  const dataFromNewsPage = route.params;

  // console.log(dataFromNewsPage);

  const [visible, setVisible] = useState(false);


  const Loading = () => {


    return (
      <View style={[styles.loadingIndicator, { backgroundColor: "transparent" }]}>

        {appTheme.name === "light" ?
          <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/pupr.mp4.lottie.json")}
                      autoPlay loop /> :
          <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/black.mp4.lottie.json")}
                      autoPlay loop />}


      </View>

    );


  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <CustomHeader title="News 📄" onPress={() => navigation.goBack()} />

      <WebView
        source={{ uri: dataFromNewsPage }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible ? <Loading /> : null}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    position: "absolute",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});


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
