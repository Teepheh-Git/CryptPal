import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { SIZES } from "../../constants";

const NewsContentPage = ({ appTheme, navigation, route }) => {

  const dataFromNewsPage = route.params;

  console.log(dataFromNewsPage);

  const [visible, setVisible] = useState(false);


  const Loading = () => {


    return (
      <View style={[styles.loadingIndicator, { backgroundColor: appTheme.backgroundColor }]}>

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

      <ScrollView showsVerticalScrollIndicator={false} style={styles.box}>
        <Text style={[styles.source, { color: appTheme.textColor }]}>{dataFromNewsPage.source.name}</Text>
        <Text style={[styles.title, { color: appTheme.textColor }]}>{dataFromNewsPage.title}</Text>
        <Text style={[styles.desc, { color: appTheme.textColor }]}>{dataFromNewsPage.description}</Text>


        <Image style={styles.img} source={{uri:dataFromNewsPage.urlToImage}}/>
        <Text style={[styles.content, { color: appTheme.textColor }]}>{dataFromNewsPage.content}</Text>


      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  box: {
    paddingHorizontal: 20,

  },

  source: {
    fontSize: 18,
    fontWeight: "200",
    letterSpacing: 0.5,

  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.5,
    lineHeight: 28,
    marginVertical:10
  },
  desc:{
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.5,
    lineHeight: 22,
    opacity:0.7,
    textAlign:"left"
    // marginVertical:10
  },
  content:{
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 0.6,
    lineHeight: 28,
    opacity:0.7,
    textAlign:"left"

  },
  img:{
    width:"100%",
    height:SIZES.height*0.2,
    borderRadius:10,
    marginVertical:10,
    backgroundColor:"rgba(159,159,159,0.11)"

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

export default connect(mapStateToProps, mapDispatchToProps)(NewsContentPage);
