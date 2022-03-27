import React, { useCallback, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import CoinList from "../../components/CoinList";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { getFavouritesCoins } from "../../stores/market/marketActions";
import NotchResponsive from "../../components/NotchResponsive";


const Favorite = ({ appTheme, navigation, appCurrency, getFavouritesCoins, favCoins }) => {

  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favPageError, setFavPageError] = useState(true);
  const [retry, setRetry] = useState("");


  // useEffect((currency) => {
  //
  //
  //   getFavouritesCoins(currency = appCurrency.ticker);
  //
  // }, [appCurrency]);

  // console.log(favCoins);
  useFocusEffect(
    useCallback((currency) => {

      getFavouritesCoins(currency = appCurrency.ticker);

    }, [appCurrency]),
  );


  // const GetFavorites = async () => {
  //
  //   try {
  //     setLoading(true);
  //
  //     const valueGot = await AsyncStorage.getItem("FavoriteCoin");
  //     const coinGotten = await JSON.parse(valueGot);
  //     const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&ids=${coinGotten[0]}%2C${coinGotten[1]}%2C${coinGotten[2]}%2C${coinGotten[3]}%2C${coinGotten[4]}%2C${coinGotten[5]}%2C${coinGotten[6]}%2C${coinGotten[7]}%2C${coinGotten[8]}%2C${coinGotten[9]}%2C${coinGotten[10]}%2C${coinGotten[11]}%2C${coinGotten[12]}%2C${coinGotten[13]}%2C${coinGotten[14]}%2C${coinGotten[15]}%2C${coinGotten[16]}%2C${coinGotten[17]}%2C${coinGotten[18]}%2C${coinGotten[19]}%2C${coinGotten[20]}%2C${coinGotten[21]}%2C${coinGotten[22]}%2C${coinGotten[23]}%2C${coinGotten[24]}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`);
  //     await setFavs(res.data);
  //
  //     if (res) {
  //       setLoading(false);
  //       setFavPageError(false);
  //
  //     }
  //
  //   } catch (e) {
  //     console.log(e);
  //     setLoading(false);
  //     setFavPageError(true);
  //
  //   }
  // };


  const CoinListRenderItem = ({ item }) => {
    return (

      <CoinList
        name={item.name}
        logoUrl={item.image}
        symbol={item.symbol.toUpperCase()}
        currentPrice={item.current_price}
        priceChangePercentage24h={item?.price_change_percentage_24h}
        chartData={item?.sparkline_in_7d?.price}
        onPress={() => navigation.navigate("CoinDetails", { ...item })}
      />
    );

  };

  const EmptyFavorite = () => {
    return (
      <View
        style={{
          width: SIZES.width * 0.7,
          alignItems: "center",
          justifyContent: "center",
          height: SIZES.height * 0.5,
        }}>
        <Image style={{ height: SIZES.font1 * 3, width: SIZES.font1 * 3 }} resizeMode={"contain"}
               source={require("../../assets/images/Sleepy.png")} />
        <Text style={{ ...FONTS.h8, color: appTheme.textColor, marginVertical: 5 }}>It’s awfully quiet here..... </Text>
        <Text style={{ ...FONTS.body9, textAlign: "center", color: appTheme.textColor3 }}>Explore coins and add to
          favorite to show here.</Text>
      </View>

    );
  };


  // NETWORK ERROR FUNCTION
  const NetworkError = () => {

    // RETRY FUNCTION
    const Retry = () => {
      setLoading(true);
      setFavPageError(true);
      let r = Math.random().toString(36).substr(2, 5);
      setRetry(r);
    };

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


  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

        <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: appTheme.textColor }]}>Favorite 🌟</Text>
          </View>
        </View>
        {/*{EmptyFavorite()}*/}

        <FlatList
          data={favCoins}
          keyExtractor={(_, index) => index.toString()}
          renderItem={CoinListRenderItem}
          showsVerticalScrollIndicator={false}
          // initialNumToRender={6}
          ListEmptyComponent={EmptyFavorite}
          // maxToRenderPerBatch={2}
          // windowSize={3}

        />


      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: "center",

  },
  headerContainer: {
    height: SIZES.font1 * 1.4,
    width: SIZES.width * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    width: SIZES.width * 0.775,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    ...FONTS.h6,
    marginHorizontal: 5,
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
    ...FONTS.h9
  },
  networkErrorContainer: {
    width: SIZES.width * 0.7,
    alignItems: "center",
    justifyContent: "center",
    top: SIZES.height * 0.2,
  },
  networkErrorText: {
    ...FONTS.h8,
    marginVertical: 5,
  },
  networkErrorDesc: {
    ...FONTS.body8,
    textAlign: "center",
  },

});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    favCoins: state.marketReducer.favCoins,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFavouritesCoins: (currency) => {
      return dispatch(getFavouritesCoins(currency));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
