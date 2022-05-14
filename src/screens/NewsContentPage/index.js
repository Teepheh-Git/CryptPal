import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { FONTS, SIZES } from "../../constants";
import NotchResponsive from "../../components/NotchResponsive";

const NewsContentPage = ({ navigation, route }) => {

  const { urlToImage, content, source, description, title, url } = route.params;
  const { appTheme } = useSelector(state => state.themeReducer);


  return (

    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

        <CustomHeader title="News 📄" onPress={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false} style={styles.box}>
          <Text style={[styles.source, { color: appTheme.textColor }]}>{source.name}</Text>
          <Text style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>
          <Text style={[styles.desc, { color: appTheme.textColor }]}>{description}</Text>


          <Image style={styles.img} source={{ uri: urlToImage }} />
          <Text
            style={[styles.content, { color: appTheme.textColor }]}>{content.slice(0, 200)}...</Text>

          <Pressable onPress={() => navigation.navigate("NewsWebPage", url)}>
            <Text style={[styles.readFull, { color: appTheme.textColor2 }]}>Read full article</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>

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
    ...FONTS.body7,
    // fontWeight: "200",
    letterSpacing: 0.5,

  },
  title: {
    ...FONTS.h1,
    // fontWeight: "600",
    letterSpacing: 0.5,
    lineHeight: 34,
    marginVertical: 10,
  },
  desc: {
    ...FONTS.body7,
    // fontWeight: "400",
    letterSpacing: 0.5,
    lineHeight: 28,
    opacity: 0.6,
    textAlign: "left",
    // marginVertical:10
  },
  content: {
    ...FONTS.body8,
    // fontWeight: "300",
    letterSpacing: 0.6,
    lineHeight: 26,
    // opacity:0.7,
    textAlign: "left",

  },
  img: {
    width: "100%",
    height: SIZES.height * 0.24,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "rgba(159,159,159,0.11)",

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
  readFull: {
    ...FONTS.h9,
    // fontWeight: "500",
    marginVertical: 20,

  },

});


export default NewsContentPage;
