import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect, useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import CoinList from "../../components/CoinList";
import constants from "../../constants/constants";
import LottieView from "lottie-react-native";
import { getCoinMarketTrend } from "../../stores/market/marketActions";
import styles from "./styles";


const MarketTrends = ({ navigation }) => {

  const { appTheme, error } = useSelector(state => state.themeReducer);
  const { appCurrency } = useSelector(state => state.currencyReducer);
  const { coinTrend } = useSelector(state => state.marketReducer);

  const dispatch = useDispatch();


  const [marketPageLoading, setMarketPageLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [tabStatus, setTabStatus] = useState("Popular");
  const [orderByCoin, setOrderByCoin] = useState("market_cap_desc");
  const [retry, setRetry] = useState("");


  function FilterCoin(item) {
    return item.sparkline_in_7d.price != [] && item.sparkline_in_7d.price != null && item.sparkline_in_7d.price != "";
  }

  if (coinTrend?.length > 0) {
    setTimeout(() => {
      setMarketPageLoading(false);
      setCategoryLoading(false);

    }, 3000);
  }

  if (coinTrend == null) {
    setTimeout(() => {
      setMarketPageLoading(false);
    }, 5000);
  }


  useEffect((currency, orderBy) => {


    if (orderByCoin === "market_cap_desc") {
      dispatch(getCoinMarketTrend(currency = appCurrency.ticker, orderBy = orderByCoin));
    }

    if (orderByCoin === "volume_desc") {
      dispatch(getCoinMarketTrend(currency = appCurrency.ticker, orderBy = orderByCoin));
    }

    if (orderByCoin === "volume_asc") {
      dispatch(getCoinMarketTrend(currency = appCurrency.ticker, orderBy = orderByCoin));
    }

    if (orderByCoin === "id_asc") {
      dispatch(getCoinMarketTrend(currency = appCurrency.ticker, orderBy = orderByCoin));
    }

    if (orderByCoin === "id_desc") {
      dispatch(getCoinMarketTrend(currency = appCurrency.ticker, orderBy = orderByCoin));
    }

    // getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);


  }, [orderByCoin, retry]);


  const CoinListRenderItem = ({ item }) =>
    <CoinList
      name={item?.name}
      logoUrl={item?.image}
      symbol={item?.symbol?.toUpperCase()}
      currentPrice={item?.current_price?.toLocaleString("en-US")}
      priceChangePercentage24h={item?.price_change_percentage_24h}
      chartData={item?.sparkline_in_7d?.price}
      onPress={() => navigation.navigate("CoinDetails", { ...item })}
    />;

  // SELECTED TREND TABS
  const setTabStatusFilter = tabStatus => {
    setTabStatus(tabStatus);
    setCategoryLoading(true);

    if (tabStatus === "Popular") {
      setOrderByCoin("market_cap_desc");
    }
    if (tabStatus === "Volume ↑") {
      setOrderByCoin("volume_desc");
    }
    if (tabStatus === "A - Z") {
      setOrderByCoin("id_asc");
    }
    if (tabStatus === "Volume ↓") {
      setOrderByCoin("volume_asc");
    }
    if (tabStatus === "Z - A") {
      setOrderByCoin("id_desc");
    }
  };


  // const Retry = () => {
  //   setMarketPageLoading(true);
  //   let r = Math.random().toString(36).substr(2, 5);
  //   setRetry(r);
  // };
  //
  // const NetworkErrorPage = () => {
  //   return (
  //     <View style={styles.networkErrorContainer}>
  //       <Image style={{ height: 98, width: 98 }} source={require("../../assets/images/ExpressionLess.png")} />
  //       <Text style={[styles.networkErrorText, { color: appTheme.textColor }]}>Network error!! </Text>
  //       <Text style={[styles.networkErrorDesc, { color: appTheme.textColor3 }]}>Your network is asleep, please check
  //         your internet connections and click refresh.</Text>
  //       <TouchableOpacity activeOpacity={0.6} onPress={() => Retry()}>
  //         <LinearGradient style={styles.refreshButton} colors={["#4F36C4", "#4F36C4"]}>
  //           <Text style={styles.refresh}>Refresh</Text>
  //         </LinearGradient>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // if (marketPageLoading) {
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
    coinTrend.length < 0
      ?
      <View style={{
        backgroundColor: appTheme.backgroundColor5, flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>


        {appTheme.name === "light" ? <LottieView style={{ width: 80, height: 80 }}
                                                 source={require("../../assets/images/pupr.mp4.lottie.json")} autoPlay
                                                 loop />
          : <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/black.mp4.lottie.json")}
                        autoPlay loop />}
      </View>
      :

      <SafeAreaView style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>
        <CustomHeader title="Market Trends 💰" onPress={() => navigation.goBack()} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.listTab}>
          {constants.listTab.map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
              onPress={() => setTabStatusFilter(buttonLabel.tabStatus)}>
              <Text
                style={[styles.textTab, tabStatus === buttonLabel.status && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
            </TouchableOpacity>
          ))
          }
        </ScrollView>
        {categoryLoading && <ActivityIndicator size={"small"} color={appTheme.textColor2} />}


        {/*{!coinTrend ? NetworkErrorPage() :*/}
          <FlatList
            data={coinTrend.filter(FilterCoin)}
            keyExtractor={(item) => item.id}
            renderItem={CoinListRenderItem}
            showsVerticalScrollIndicator={false}
            // initialNumToRender={20}
            // getItemLayout={getItemLayout}
            // maxToRenderPerBatch={3}
            ListFooterComponent={
              <View style={{ marginBottom: 50 }} />
            }
          />
        {/*}*/}
      </SafeAreaView>
  );
};

export default MarketTrends;
