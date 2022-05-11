import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import CoinCard from "../../components/CoinCard";
import CoinList from "../../components/CoinList";
import { icons, SIZES } from "../../constants";
import { getCardMarket, getCoinMarket } from "../../stores/market/marketActions";
import LottieView from "lottie-react-native";
import constants from "../../constants/constants";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import axios from "axios";
import NotchResponsive from "../../components/NotchResponsive";
import * as Animatable from "react-native-animatable";


function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));

}

const Home = ({ navigation, appTheme, appCurrency, getCoinMarket, getCardMarket, coinCard, coins, item }) => {

  // const ITEM_HEIGHT = 75;
  //
  // const getItemLayout = useCallback((data, index) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  //
  // }), []);


  //  SORT COIN CARD FUNCTION
  function TopMoverCoins(a, b) {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  }

  function FilterCoin(item) {
    return item.sparkline_in_7d.price != [] && item.sparkline_in_7d.price != null && item.sparkline_in_7d.price != "";
  }

  const [homePageLoading, setHomePageLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [tabStatus, setTabStatus] = useState("Popular");
  const [orderByCoin, setOrderByCoin] = useState("market_cap_desc");
  const [retry, setRetry] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCoin, setModalCoin] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [modalCoinInfo, setModalCoinInfo] = useState({});
  const [refreshing, setRefreshing] = useState(false);


  if (coins?.length > 0 && coinCard?.length > 0) {
    setTimeout(() => {
      setHomePageLoading(false);
      setCategoryLoading(false);

    }, 300);
  }

  if (coins == null || coinCard == null) {
    setTimeout(() => {
      setHomePageLoading(false);
    }, 2000);
  }


  // useFocusEffect(
  //     useCallback(() => {
  //         getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin)
  //         // getCardMarket(currency = appCurrency.ticker)
  //     }, [appCurrency, orderByCoin, retry])
  // )


  const onPullDown = useCallback((currency, orderBy) => {
    setRefreshing(true);


    if (orderByCoin === "market_cap_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "volume_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);

    }

    if (orderByCoin === "volume_asc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "id_asc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "id_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }
    getCardMarket(currency = appCurrency.ticker);

    wait(3000).then(() => setRefreshing(false));


  }, [appCurrency, orderByCoin, retry]);

  useEffect((currency, orderBy) => {


    // console.log((coins.filter(FilterCoin)), "FFFFFFF");

    // const arrFiltered = coins.filter(item => {
    //   return item.sparkline_in_7d.price != [] &&item.sparkline_in_7d.price != null && item.sparkline_in_7d.price != '';
    // });
    // console.log(arrFiltered, "ARRRR");


    if (orderByCoin === "market_cap_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "volume_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "volume_asc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "id_asc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    if (orderByCoin === "id_desc") {
      getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin);
    }

    getCardMarket(currency = appCurrency.ticker);
  }, [appCurrency, orderByCoin, retry]);


  useEffect((currency) => {
    getCardMarket(currency = appCurrency.ticker);
  }, [appCurrency]);


  // console.log(coins,"koiiiii");

  // HOME PAGE LOADING FUNCTION
  if (homePageLoading) {
    return (
      <View style={[styles.homePageLoading, { backgroundColor: appTheme.backgroundColor5 }]}>
        {appTheme.name === "light" ? <LottieView style={{ width: 80, height: 80 }}
                                                 source={require("../../assets/images/pupr.mp4.lottie.json")} autoPlay
                                                 loop />
          : <LottieView style={{ width: 80, height: 80 }} source={require("../../assets/images/black.mp4.lottie.json")}
                        autoPlay loop />}
      </View>
    );
  }

  // COIN CARD COMPONENT RENDER ITEM
  const CoinCardRenderItem = ({ item, index }) => {
    return (
      <CoinCard
        name={item.name}
        logoUrl={item.image}
        currentPrice={item?.current_price.toLocaleString("en-US")}
        priceChangePercentage24h={item?.price_change_percentage_24h}
        onPress={() => {
          navigation.navigate("CoinDetails", { ...item });
        }}
      />
    );
  };


  // COIN LIST COMPONENT RENDER ITEM
  const CoinListRenderItem = ({ item, index }) => {

    // console.log(index*200);
    return (
      <CoinList
        name={item?.name}
        logoUrl={item?.image}
        symbol={item?.symbol?.toUpperCase()}
        currentPrice={item?.current_price?.toLocaleString("en-US")}
        priceChangePercentage24h={item?.price_change_percentage_24h}
        chartData={item?.sparkline_in_7d?.price !== [] && item?.sparkline_in_7d?.price}
        onPress={() => navigation.navigate("CoinDetails", { ...item })}
        // onLongPress={() => {
        //   setModalVisible(true);
        //   setModalCoin(item?.id);
        // }}


      />
    );
  };


  // SELECTED TREND TABS
  const setTabStatusFilter = (tabStatus) => {
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


  // RETRY FUNCTION
  const Retry = () => {
    setHomePageLoading(true);
    let r = Math.random().toString(36).substr(2, 5);
    setRetry(r);
  };

  // NETWORK ERROR FUNCTION
  const NetworkError = () => {
    return (
      <View style={styles.networkErrorContainer}>
        <Image style={{ height: 98, width: 98 }} source={require("../../assets/images/ExpressionLess.png")} />
        <Text style={[styles.networkErrorText, { color: appTheme.textColor }]}>Network error!! </Text>
        <Text style={[styles.networkErrorDesc, { color: appTheme.textColor3 }]}>Your network is asleep, please check
          your internet connections and click refresh.</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => Retry()}>
          <LinearGradient style={styles.refreshButton} colors={["#4F36C4", "#4F36C4"]}>
            <Text style={styles.refresh}>Refresh</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: "#EEF1F5",
        height: 0.5,
        width: SIZES.width * 0.9,
        alignSelf: "center",

      }}
    />
  );


  function CoinModal() {


    const getModalCoinInfo = async () => {

      try {

        setModalLoading(true);

        const getCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${modalCoin}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24`);

        // console.log(getCoin.data[0]);
        setModalCoinInfo(getCoin.data[0]);
        setModalLoading(false);

      } catch (e) {
        console.log(e, "getModalCoinInfoErr");
        setModalLoading(false);
      }


    };


    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          onShow={getModalCoinInfo}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable onPress={() => setModalVisible(!modalVisible)}
                     style={styles.centeredView}>


            <View style={[styles.modalView, { backgroundColor: appTheme.backgroundColor }]}>

              {modalLoading ? <ActivityIndicator size={"small"} color={appTheme.textColor3} /> :
                <View>
                  <Image
                    resizeMode={"contain"}
                    source={{ uri: modalCoinInfo.image }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                      marginRight: 5,
                    }} />


                  <Text>{modalCoinInfo.name}</Text>
                </View>

              }


            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }


  return (

    <>


      <NotchResponsive color={appTheme.backgroundColor2} />

      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>


        {/* MARKET COIN LIST */}
        {coins == null || coinCard == null ? NetworkError() :

          <FlatList
            data={coins.filter(FilterCoin)}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onPullDown}
                title={"Release to update"}
                titleColor={appTheme.textColor2}
                tintColor={appTheme.textColor2}
              />
            }
            // getItemLayout={getItemLayout}
            // ItemSeparatorComponent={renderSeparator}
            // removeClippedSubviews={true}
            renderItem={CoinListRenderItem}
            ListFooterComponent={

              <>
                <Pressable style={styles.listSeeAllContainer} onPress={() => navigation.navigate("MarketTrends")}>
                  <Text style={[styles.listSeeAll, { color: appTheme.textColor2 }]}>See all </Text>
                  <Image style={{ width: 16, height: 16, tintColor: appTheme.textColor2 }} source={icons.arrowRight} />
                </Pressable>

                <View style={{
                  height: SIZES.font1,
                }} />
              </>

            }
            ListHeaderComponent={
              <>
                {/* HEADER SECTION */}
                <Animatable.View useNativeDriver={true} animation={"tada"}
                                 style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
                  <Image resizeMode="cover" style={[styles.imgHeader, { tintColor: appTheme.tintColor }]}
                         source={require("../../assets/images/logo.png")} />
                </Animatable.View>
                <View useNativeDriver={true} duration={400} animation={"zoomIn"}
                      style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
                  {/* TOP MOVERS SECTION */}
                  <View style={styles.topMoversContainer}>
                    <View style={styles.topMoversContainer2}>
                      <Text style={[styles.topMovers, { color: appTheme.textColor }]}>Top Movers{" "}
                        <Image resizeMode="cover" style={{ width: 20, height: 20 }}
                               source={require("../../assets/icons/checkMark.png")} />
                      </Text>
                      <Text style={[styles.last24, { color: appTheme.textColor }]}>Last 24hrs</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("TopMovers", { ...item })}>
                      <Text style={[styles.seeAll, { color: appTheme.textColor2 }]}>See all</Text>
                    </TouchableOpacity>
                  </View>

                  {/* COIN CARD SECTION */}
                  <Animatable.View useNativeDriver={true} animation={"slideInRight"} style={styles.coinCard}>
                    <FlatList
                      data={coinCard?.sort(TopMoverCoins)?.slice(0, 7)}
                      keyExtractor={(_, index) => index.toString()}
                      horizontal
                      decelerationRate={"fast"}
                      snapToInterval={SIZES.width * 0.4}
                      snapToAlignment={"start"}
                      // removeClippedSubviews={true}
                      showsHorizontalScrollIndicator={false}
                      // initialNumToRender={10}
                      renderItem={CoinCardRenderItem} />
                  </Animatable.View>


                  {CoinModal()}

                  {/* MARKET TRENDS  */}
                  <View
                    style={styles.marketTrendsContainer}>
                    <Text style={[styles.marketTrends, { color: appTheme.textColor }]}>Market Trends </Text>
                    <Image resizeMode="cover" style={{ width: 20, height: 20 }}
                           source={require("../../assets/icons/moneyBag.png")} />

                  </View>

                  {/* MARKET TREND TABS */}

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
                          style={[styles.textTab, tabStatus === buttonLabel.tabStatus && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {categoryLoading && <ActivityIndicator size={"small"} color={appTheme.textColor2} />}

                </View>
              </>

            }
          />

        }

      </View>

    </>

  );


};


export function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
    coinCard: state.marketReducer.coinCard,
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    // error: state.currencyReducer.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCoinMarket: (currency, orderBy, sparkline, priceChangePerc, perPage, page) => {
      return dispatch(getCoinMarket(currency, orderBy, sparkline, priceChangePerc, perPage = 6, page));
    },
    getCardMarket: (currency, orderBy, priceChangePerc, perPage, page, sparkline) => {
      return dispatch(getCardMarket(currency, orderBy, sparkline, priceChangePerc, perPage, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

