import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import CoinCard from "../../components/CoinCard";
import CoinList from "../../components/CoinList";
import { useNavigation } from "@react-navigation/native";
import { icons, SIZES } from "../../constants";
import { getCardMarket, getCoinMarket } from "../../stores/market/marketActions";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import constants from "../../constants/constants";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import axios from "axios";


const Home = ({ appTheme, appCurrency, getCoinMarket, getCardMarket, coinCard, coins, item }) => {

  // const ITEM_HEIGHT = 75;
  //
  // const getItemLayout = useCallback((data, index) => ({
  //   length: ITEM_HEIGHT,
  //   offset: ITEM_HEIGHT * index,
  //   index,
  //
  // }), []);


  const navigation = useNavigation();

  //  SORT COIN CARD FUNCTION
  function TopMoverCoins(a, b) {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
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


  if (coins?.length > 0 && coinCard?.length > 0) {
    setTimeout(() => {
      setHomePageLoading(false);
      setCategoryLoading(false);

    }, 1000);
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

  useEffect((currency, orderBy) => {


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
  const CoinCardRenderItem = ({ item }) => {
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
  const CoinListRenderItem = ({ item }) => {
    return (
      <CoinList
        name={item?.name}
        logoUrl={item?.image}
        symbol={item?.symbol?.toUpperCase()}
        currentPrice={item?.current_price?.toLocaleString("en-US")}
        priceChangePercentage24h={item?.price_change_percentage_24h}
        chartData={item?.sparkline_in_7d?.price}
        onPress={() => navigation.navigate("CoinDetails", { ...item })}
        onLongPress={() => {
          setModalVisible(true);
          setModalCoin(item?.id);
        }}


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
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
      {/*<StatusBar translucent={true} backgroundColor={"transparent"} />*/}


      {/* HEADER SECTION */}
      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <Image resizeMode="cover" style={[styles.imgHeader, { tintColor: appTheme.tintColor }]}
               source={require("../../assets/images/logo.png")} />
      </View>

      {/* MARKET COIN LIST */}
      {coins == null || coinCard == null ? NetworkError() :

        <FlatList
          data={coins}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          // getItemLayout={getItemLayout}
          // ItemSeparatorComponent={renderSeparator}
          removeClippedSubviews={true}
          renderItem={CoinListRenderItem}
          ListFooterComponent={
            <TouchableOpacity style={styles.listSeeAllContainer} onPress={() => navigation.navigate("MarketTrends")}>
              <Text style={[styles.listSeeAll, { color: appTheme.textColor2 }]}>See all </Text>
              <Image style={{ width: 16, height: 16, tintColor: appTheme.textColor2 }} source={icons.arrowRight} />
            </TouchableOpacity>
          }
          ListHeaderComponent={
            <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
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
              <View style={styles.coinCard}>
                <FlatList
                  data={coinCard?.sort(TopMoverCoins)?.slice(0, 7)}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  removeClippedSubviews={true}
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={10}
                  renderItem={CoinCardRenderItem} />
              </View>


              {CoinModal()}

              {/* MARKET TRENDS  */}
              <View style={styles.marketTrendsContainer}>
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

            </View>}
        />}
    </SafeAreaView>
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
      return dispatch(getCoinMarket(currency, orderBy, sparkline, priceChangePerc, perPage = 10, page));
    },
    getCardMarket: (currency, orderBy, priceChangePerc, perPage, page, sparkline) => {
      return dispatch(getCardMarket(currency, orderBy, sparkline, priceChangePerc, perPage, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

