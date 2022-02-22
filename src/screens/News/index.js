import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import NewsListItem from "../../components/NewsListItem";
import { FONTS, icons, SIZES } from "../../constants";
import axios from "axios";

const News = ({ appTheme, navigation }) => {


  const [news, setNews] = useState([]);

  const Separator = () => {
    return (
      <View
        style={{ width: SIZES.width * 0.9, backgroundColor: appTheme.textColor3, height: 0.4 }} />
    );

  };


  useEffect(() => {
    GetNews();


  }, []);


  const GetNews = async () => {


    try {

      // const newsRes = await axios.get("https://newsapi.org/v2/top-headlines?q=blockchain&apiKey=72d2a0865ac740eb860785c920c9f54e");
      const newsRes = await axios.get("https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&pageSize=5&apiKey=72d2a0865ac740eb860785c920c9f54e");

      await setNews(newsRes.data.articles);
      console.log(newsRes.data.articles);

    } catch (e) {
      console.log(e, "GetNewsErr");
    }


  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: appTheme.textColor }]}>News 📄</Text>
        </View>
        {/*<TouchableOpacity style={styles.filterButtonContainer}>*/}
        {/*  <Image style={styles.filterButton} source={icons.filterButton} />*/}
        {/*</TouchableOpacity>*/}

      </View>

      <Text style={[styles.highlights, { color: appTheme.textColor }]}>Highlights</Text>


      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={news}
            horizontal
            snapToAlignment={"start"}
            snapToStart={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (

              // <View style={styles.imgBox}>
              <Pressable onPress={() => navigation.navigate("NewsContentPage", { ...item })}>
                <ImageBackground imageStyle={{ borderRadius: 15 }} resizeMode={"cover"}
                                 style={[styles.imgBg, { marginLeft: index === 0 && 20 }]}
                                 source={item.urlToImage !== null ? { uri: item.urlToImage } : icons.imgPlacehholder}>

                  <View style={styles.bigCardDet}>

                    <Text style={styles.bigCardTitle} numberOfLines={2}>{item.title}</Text>
                    <Text
                      style={styles.bigCardTitle2}>{moment(item.publishedAt).startOf("hour").fromNow()} • <Text>{item.source.name}</Text></Text>

                  </View>


                </ImageBackground>
              </Pressable>


              // </View>


            )
            } />


        }
        // ItemSeparatorComponent={Separator}
        renderItem={({ item }) =>

          <NewsListItem image={item.urlToImage} title={item.title} source={item.source.name}
                        time={moment(item.publishedAt).startOf("hour").fromNow()} link={"read more"}
                        onPress={() => navigation.navigate("NewsWebPage", { ...item })} />


        }
        listFooterComponent={
          <View style={{ marginBottom: 70 }} />
        }
      />


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // width: SIZES.width*0.9,
    // height: SIZES.height

  },
  headerContainer: {
    height: 55,
    width: SIZES.width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  filterButtonContainer: {
    justifyContent: "flex-end",
  },
  filterButton: {
    width: 48,
    height: 36,
  },
  titleContainer: {
    width: SIZES.width * 0.775,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...FONTS.h2,
    marginHorizontal: 5,
  },
  highlights: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    ...FONTS.body2,
    fontWeight: "500",
  },
  imgBox: {
    // width:"70%"
  },
  imgBg: {
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.23,
    marginHorizontal: 10,
    borderRadius: 15,
    marginVertical: 10,

  },
  bigCardDet: {
    // backgroundColor:"black",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(3,3,3,0.19)",
    // zIndex:10000000000,
    justifyContent: "flex-end",
    // alignItems:"center",
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderRadius: 15,


  },
  bigCardTitle: {
    color: "white",
    ...FONTS.body3,
    lineHeight: 18,
    fontWeight: "bold",
  },
  bigCardTitle2: {
    color: "white",
    ...FONTS.body5,
    lineHeight: 18,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.8,
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
