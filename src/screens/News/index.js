import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList, Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import NewsListItem from "../../components/NewsListItem";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import axios from "axios";
import constants from "../../constants/constants";
import { getHeadlineNewsMarket, getNewsMarket } from "../../stores/market/marketActions";

const News = ({ appTheme, navigation, getNewsMarket, getHeadlineNewsMarket, headlineNews, news }) => {



  // const ITEM_HEIGHT = 75;

  // const getItemLayout = useCallback((data, index) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT,
  //   index,
  //
  // }), []);


  // const [myNews, setMyNews] = useState([]);
  // const [highlights, setHighlights] = useState([]);
  const [tabStatus, setTabStatus] = useState("Latest");
  const [category, setCategory] = useState("popularity");
  const [keyword, setKeyword] = useState("bitcoin");


  // const [coinSearch, setCoinSearch] = useState("");
  // const [isFocused, setIsFocused] = useState(false);

  // console.log(news, "JJJJJ");

  const [categoryLoading, setCategoryLoading] = useState(false);


  const Separator = () => {
    return (
      <View
        style={{ width: SIZES.width * 0.9, backgroundColor: appTheme.textColor3, height: 0.4 }} />
    );

  };


  useEffect((keyword, category) => {

    // GetNews();
    getHeadlineNewsMarket();

    if (tabStatus === "Popular") {
      getNewsMarket(keyword = "blockchain+bitcoin", category = "popularity");

    }

    if (tabStatus === "Latest") {
      getNewsMarket(keyword = "crypto+blockchain", category = "publishedAt");

    }

    if (tabStatus === "Solana") {
      getNewsMarket(keyword = "solana", category = "publishedAt");

    }

    if (tabStatus === "NFT") {
      getNewsMarket(keyword = "nft", category = "publishedAt");

    }

    if (tabStatus === "Ethereum") {
      getNewsMarket(keyword = "ethereum", category = "publishedAt");

    }


  }, [tabStatus, keyword]);


  if (news?.length > 0) {
    setTimeout(() => {
      setCategoryLoading(false);
    }, 1000);
  }

  const GetNews = async () => {


    try {

      const highlightRes = await axios.get("https://newsapi.org/v2/everything?q=blockchain&sortBy=publishedAt&searchIn=title&pageSize=5&apiKey=72d2a0865ac740eb860785c920c9f54e");
      const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&searchIn=title&sortBy=${category}&language=en&sortBy=publishedAt&pageSize=10&apiKey=72d2a0865ac740eb860785c920c9f54e`);

      await setMyNews(newsRes.data.articles);
      await setHighlights(highlightRes.data.articles);
      console.log(newsRes.data.articles);
      await setCategoryLoading(false);

    } catch (e) {
      console.log(e, "GetNewsErr");
      await setCategoryLoading(false);

    }


  };


  const setTabStatusFilter = (tabStatus) => {
    setTabStatus(tabStatus);
    setCategoryLoading(true);
    if (tabStatus === "Popular") {
      setCategory("popularity");
    }
    if (tabStatus === "Latest") {
      setCategory("publishedAt");
    }
    if (tabStatus === "Solana") {
      setKeyword("solana");
    }
    if (tabStatus === "NFT") {
      setKeyword("nft");
    }
    if (tabStatus === "Ethereum") {
      setKeyword("ethereum");
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
        // getItemLayout={getItemLayout}
        // initialScrollIndex={4}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={

          <>
            {/*<View style={{*/}
            {/*  flexDirection: "row",*/}
            {/*  width: SIZES.width * 0.95,*/}
            {/*  height: 55,*/}
            {/*  alignItems: "center",*/}
            {/*  justifyContent: "center",*/}
            {/*  marginVertical: 10,*/}
            {/*  alignSelf:"center"*/}
            {/*}}>*/}
            {/*  <TextInput*/}
            {/*    placeholder={"Search for crypto related news..."}*/}
            {/*    value={coinSearch}*/}
            {/*    // onChangeText={(text) => SearchFilter(text)}*/}
            {/*    onChangeText={value => setCoinSearch(value)}*/}
            {/*    placeholderTextColor={appTheme.textColor3}*/}
            {/*    onFocus={() => setIsFocused(true)}*/}
            {/*    multiline={false}*/}
            {/*    style={{*/}
            {/*      width: SIZES.width * 0.9,*/}
            {/*      height: 55, backgroundColor: appTheme.backgroundColor,*/}
            {/*      borderRadius: 8,*/}
            {/*      borderWidth: isFocused ? 1 : null,*/}
            {/*      borderColor: isFocused ? appTheme.textColor2 : null,*/}
            {/*      paddingHorizontal: 15,*/}
            {/*      left: 10,*/}
            {/*      paddingRight: 30,*/}
            {/*      color: appTheme.textColor,*/}
            {/*    }}>*/}
            {/*  </TextInput>*/}
            {/*  <Image style={{ width: 17, height: 17, tintColor: appTheme.textColor3, right: 15 }}*/}
            {/*         source={icons.searchBarIcon} />*/}
            {/*</View>*/}

            <FlatList
              data={headlineNews}
              horizontal
              snapToAlignment={"start"}
              snapToStart={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (


                <Pressable onPress={() => navigation.navigate("NewsContentPage", { ...item })}>
                  <ImageBackground imageStyle={{ borderRadius: 15 }} resizeMode={"cover"}
                                   style={[styles.imgBg, { marginLeft: index === 0 ? 20:0 }]}
                                   source={item?.urlToImage !== null ? { uri: item?.urlToImage } : icons.imgPlacehholder}>

                    <View style={styles.bigCardDet}>

                      <Text style={styles.bigCardTitle} numberOfLines={2}>{item?.title}</Text>
                      <Text
                        style={styles.bigCardTitle2}>{moment(item?.publishedAt).startOf("hour").fromNow()} • <Text>{item?.source.name}</Text></Text>

                    </View>


                  </ImageBackground>
                </Pressable>


              )
              } />

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={styles.listTab}>
              {constants.newsListTab.map((buttonLabel, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
                  onPress={() => setTabStatusFilter(buttonLabel.tabStatus)}>
                  <Text
                    style={[styles.textTab, tabStatus === buttonLabel.tabStatus && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {categoryLoading && <ActivityIndicator size={"small"} color={appTheme.textColor2} />}
          </>


        }
        // ItemSeparatorComponent={Separator}
        renderItem={({ item }) =>

          <NewsListItem image={item?.urlToImage} title={item?.title} source={item?.source.name}
                        time={moment(item?.publishedAt).startOf("hour").fromNow()} link={"read more"}
                        onPress={() => navigation.navigate("NewsContentPage", { ...item })} />


        }
        ListFooterComponent={
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
    ...FONTS.h2,
    // fontWeight: "500",
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
    ...FONTS.h3,
    lineHeight: 18,
    fontWeight: "bold",
  },
  bigCardTitle2: {
    color: "white",
    ...FONTS.h3,
    lineHeight: 18,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.8,
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    // justifyContent: "flex-start",
    width: SIZES.width * 0.9,
    // alignItems: "flex-end",
    // backgroundColor:'red',
    marginVertical: 20,
    // elevation: 0.3,
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },
  },
  btnTab: {
    height: SIZES.height * 0.05,
    // marginHorizontal: 5,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 0.25,
    alignItems: "center",
    borderColor: COLORS.grey,
    borderRadius: 5,
    justifyContent: "center",

  },
  textTab: {
    ...FONTS.body4,
    marginHorizontal: 10,
    color: COLORS.grey,
    letterSpacing: 1,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textTabActive: {
    color: "white",
  },


});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    news: state.marketReducer.news,
    headlineNews: state.marketReducer.headlineNews,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNewsMarket: (keyword, category) => {
      return dispatch(getNewsMarket(keyword, category));
    },

    getHeadlineNewsMarket: () => {
      return dispatch(getHeadlineNewsMarket());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
