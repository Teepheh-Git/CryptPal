import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";

const NewsWebPage = ({ navigation, route }) => {

  const { appTheme } = useSelector(state => state.themeReducer);
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
        source={{ uri: route.params }}
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


export default NewsWebPage;
