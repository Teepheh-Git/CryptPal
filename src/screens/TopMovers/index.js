import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { COLORS, FONTS, SIZES } from "../../constants";
import CoinList from "../../components/CoinList";
import { getCardMarket } from "../../stores/market/marketActions";
import constants from "../../constants/constants";
import NotchResponsive from "../../components/NotchResponsive";


function TopMoverCoins(a, b) {
  return (
    b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency ||
    b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency ||
    b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency ||
    b.price_change_percentage_14d_in_currency - a.price_change_percentage_14d_in_currency ||
    b.price_change_percentage_30d_in_currency - a.price_change_percentage_30d_in_currency ||
    b.price_change_percentage_200d_in_currency - a.price_change_percentage_200d_in_currency ||
    b.price_change_percentage_1y_in_currency - a.price_change_percentage_1y_in_currency);
}


const TopMovers = ({ appTheme, appCurrency, navigation, getCardMarket, coinCard, route }) => {

  // const ITEM_HEIGHT = 75;
  //
  // const getItemLayout = useCallback((data, index) => ({
  //
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  //
  //
  // }), []);


  const [tabStatus, setTabStatus] = useState("24H");
  const [coinPriceChangePerc, setCoinPriceChangePerc] = useState("24h");
  // const [coinFetched, setCoinFetched] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  // const [retry, setRetry] = useState("");

  if (coinCard?.length > 0) {
    setTimeout(() => {
      setSearchLoading(false);
    }, 3000);
  }
  // if (coinCard == null) {
  //   setTimeout(() => {
  //     setSearchLoading(false);
  //   }, 3000);
  // }

  // const GetMarketData = async (orderBy = "market_cap_desc", sparkline = true, perPage = 250, page = 1) => {
  //   try {
  //     const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);
  //     const data = response.data;
  //     return data;
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  useEffect((currency, priceChangePerc) => {


    getCardMarket(currency = appCurrency.ticker, priceChangePerc = coinPriceChangePerc);
    return () => {
      setTabStatus("24H");
      setSearchLoading(true);
      setCoinPriceChangePerc("24h");
    };


  }, [coinPriceChangePerc]);


  const CoinListRenderItem = ({ item }) =>
    <CoinList
      name={item?.name}
      logoUrl={item?.image}
      symbol={item?.symbol?.toUpperCase()}
      currentPrice={item?.current_price?.toLocaleString("en-US")}
      priceChangePercentageInCurrency={
        item?.price_change_percentage_1h_in_currency ||
        item?.price_change_percentage_24h_in_currency ||
        item?.price_change_percentage_7d_in_currency ||
        item?.price_change_percentage_14d_in_currency ||
        item?.price_change_percentage_30d_in_currency ||
        item?.price_change_percentage_200d_in_currency ||
        item?.price_change_percentage_1y_in_currency
      }
      chartData={item?.sparkline_in_7d?.price}
      onPress={() => navigation.navigate("CoinDetails", { ...item })}
    />;


  const setTabStatusFilter = tabStatus => {
    setTabStatus(tabStatus);
    setSearchLoading(true);

    if (tabStatus === "1H") {
      setCoinPriceChangePerc("1h");
    }
    if (tabStatus === "24H") {
      setCoinPriceChangePerc("24h");
    }
    if (tabStatus === "7D") {
      setCoinPriceChangePerc("7d");
    }
    if (tabStatus === "2W") {
      setCoinPriceChangePerc("14d");
    }
    if (tabStatus === "1M") {
      setCoinPriceChangePerc("30d");
    }
    if (tabStatus === "6M") {
      setCoinPriceChangePerc("200d");
    }
    if (tabStatus === "1Y") {
      setCoinPriceChangePerc("1y");
    }
  };


  // const Retry = () => {
  //   setSearchLoading(true);
  //   let r = Math.random().toString(36).substr(2, 5);
  //   setRetry(r);
  // };

  // const NetworkErrorPage = () => {
  //   return (
  //     <View style={{
  //       width: SIZES.width * 0.7,
  //       alignItems: "center",
  //       justifyContent: "center",
  //       top: SIZES.height * 0.2,
  //       alignSelf: "center",
  //     }}>
  //       <Image style={{ height: 98, width: 98 }} source={require("../../assets/images/Sleepy.png")} />
  //       <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>Network error!! </Text>
  //       <Text style={{ ...FONTS.body4, textAlign: "center", color: appTheme.textColor3 }}>Your network is asleep, please
  //         check your internet connections and click refresh.</Text>
  //       <TouchableOpacity activeOpacity={0.6} onPress={() => Retry()}>
  //         <LinearGradient style={styles.refreshButton} colors={["#4F36C4", "#4F36C4"]}>
  //           <Text style={styles.refresh}>Refresh</Text>
  //         </LinearGradient>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };


  // if (searchLoading) {
  //   return (
  //     <View
  //       style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: appTheme.backgroundColor }}>
  //       {appTheme.name === "light" ?
  //         <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/pupr.mp4.lottie.json")}
  //                     autoPlay loop /> :
  //         <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/black.mp4.lottie.json")}
  //                     autoPlay loop />}
  //     </View>
  //   );
  // }


  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>
        <CustomHeader title="Top Movers ✅" onPress={() => navigation.goBack()} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listTab}>
            {constants.topMoversListTab.map((buttonLabel, index) => (
              <Pressable
                key={index}
                style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
                onPress={() => setTabStatusFilter(buttonLabel.tabStatus)}>
                <Text
                  style={[styles.textTab, tabStatus === buttonLabel.tabStatus && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
              </Pressable>
            ))
            }

          </ScrollView>


          {searchLoading && <ActivityIndicator size={"small"} color={appTheme.textColor2} />}

          {/*{coinCard == null ? NetworkErrorPage() :*/}
          <FlatList
            // data={coinCard?.sort(TopMoverCoins).slice(0, 31)}
            data={coinCard?.sort(TopMoverCoins)?.slice(0, 10)}
            keyExtractor={(item) => item.id}
            renderItem={CoinListRenderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View style={{
                height: SIZES.font1 * 4,
              }} />
            }
          />

          {/*}*/}
        </View>
      </View>
    </>

  );
};


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,
  },
  listTab: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: SIZES.width * 0.9,
    // marginHorizontal:0.05,
    // alignItems: "center",
  },
  btnTab: {
    height: 40,
    width: SIZES.font1 * 1.6,
    marginRight: 5,
    marginVertical: 5,
    borderWidth: 0.25,
    alignItems: "center",
    borderColor: COLORS.grey,
    borderRadius: 5,
    justifyContent: "center",
  },
  textTab: {
    ...FONTS.body9,
    paddingHorizontal: 5,
    color: COLORS.grey,
    marginHorizontal: 5,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textTabActive: {
    color: "white",
  },
  refreshButton: {
    width: SIZES.width * 0.34,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius3,
    marginVertical: 40,
  },
  refresh: {
    color: COLORS.white,
    ...FONTS.h5,
  },
});


export function mapStateToProps(state) {
  return {
    // coins: state.marketReducer.coins,
    coinCard: state.marketReducer.coinCard,
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    // error: state.currencyReducer.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCardMarket: (currency, priceChangePerc, orderBy, perPage, page, sparkline) => {
      return dispatch(getCardMarket(currency, priceChangePerc, orderBy, perPage, page, sparkline));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMovers);
