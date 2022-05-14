import React, { useCallback } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CoinList from "../../components/CoinList";
import { COLORS, FONTS, SIZES } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";
import { getFavouritesCoins } from "../../stores/market/marketActions";
import NotchResponsive from "../../components/NotchResponsive";


const Favorite = ({ navigation }) => {

  const { appTheme, error } = useSelector(state => state.themeReducer);
  const { appCurrency } = useSelector(state => state.currencyReducer);
  const { favCoins } = useSelector(state => state.marketReducer);

  const dispatch = useDispatch();


  useFocusEffect(
    useCallback((currency) => {

      dispatch(getFavouritesCoins(currency = appCurrency.ticker));

    }, [appCurrency]),
  );


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
  // const NetworkError = () => {
  //
  //   // RETRY FUNCTION
  //   const Retry = () => {
  //     setLoading(true);
  //     setFavPageError(true);
  //     let r = Math.random().toString(36).substr(2, 5);
  //     setRetry(r);
  //   };
  //
  //   return (
  {/*    <View style={styles.networkErrorContainer}>*/
  }
  {/*      <Image style={{ height: 98, width: 98 }} source={require("../../assets/images/ExpressionLess.png")} />*/
  }
  {/*      <Text style={[styles.networkErrorText, { color: appTheme.textColor }]}>Network error!! </Text>*/
  }
  {/*      <Text style={[styles.networkErrorDesc, { color: appTheme.textColor3 }]}>Your network is asleep, please check*/
  }
  //         your internet connections and click refresh.</Text>
  //       <TouchableOpacity activeOpacity={0.6} onPress={() => Retry()}>
  //         <LinearGradient style={styles.refreshButton} colors={["#4F36C4", "#4F36C4"]}>
  //           <Text style={styles.refresh}>Refresh</Text>
  //         </LinearGradient>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };


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
          ListEmptyComponent={EmptyFavorite}
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
    ...FONTS.h9,
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

export default Favorite;
