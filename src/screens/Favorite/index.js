import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import CoinList from "../../components/CoinList";
import { FONTS, SIZES } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Favorite = ({ appTheme, navigation, appCurrency }) => {


  // const coinGotten = JSON.parse(valueGot);


  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(false);


  // const id1 =  value[0];
  // const id2 =  value[1];
  // const id3 =  value[2];
  // const id4 =  value[3];
  // const id5 =  value[4];
  // const id6 =  value[5];
  // const id7 =  value[6];
  // const id8 =  value[7];
  // const id9 =  value[8];
  // const id10 =  value[9];

  // setValue(coinGotten);

  // console.log(valueGot);


  // console.log(value);
  // useFocusEffect(
  //   useCallback(() => {
  //
  //
  //   }, []),
  // );

  useEffect(() => {


    const GetFavorites = async () => {

      try {
        const valueGot = await AsyncStorage.getItem("FavoriteCoin");
        const coinGotten = await JSON.parse(valueGot);

        setLoading(true);
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&ids=${coinGotten[0]}%2C${coinGotten[1]}%2C${coinGotten[2]}%2C${coinGotten[3]}%2C${coinGotten[4]}%2C${coinGotten[5]}%2C${coinGotten[6]}%2C${coinGotten[7]}%2C${coinGotten[8]}%2C${coinGotten[9]}%2C${coinGotten[10]}%2C${coinGotten[11]}%2C${coinGotten[12]}%2C${coinGotten[13]}%2C${coinGotten[14]}%2C${coinGotten[15]}%2C${coinGotten[16]}%2C${coinGotten[17]}%2C${coinGotten[18]}%2C${coinGotten[19]}%2C${coinGotten[20]}%2C${coinGotten[21]}%2C${coinGotten[22]}%2C${coinGotten[23]}%2C${coinGotten[24]}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`);

        await setFavs(res.data);

        if (res) {
          setLoading(false);
        }

      } catch (e) {
        console.log(e);
        setLoading(false);

      }
    };


    GetFavorites();


  }, [appCurrency]);


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
        style={{ width: SIZES.width * 0.7, alignItems: "center", justifyContent: "center", top: SIZES.height * 0.2 }}>
        <Image style={{ height: 98, width: 98 }} source={require("../../assets/images/Sleepy.png")} />
        <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>It’s awfully quiet here..... </Text>
        <Text style={{ ...FONTS.body4, textAlign: "center", color: appTheme.textColor3 }}>Explore coins and add to
          favorite to show here.</Text>
      </View>

    );
  };

  // const UniqueFavCoins = value.reduce((acc, cur) => [
  //   ...acc.filter((obj) => obj.id !== cur.id), cur,
  // ], []);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: appTheme.textColor }]}>Favorite 🌟</Text>
        </View>
      </View>


      {/*{value.length < 1 && EmptyFavorite()}*/}

      {loading ? <ActivityIndicator color={appTheme.textColor2} size={"small"} /> :
        (favs.length < 1 ? EmptyFavorite() :
          <FlatList
            // data={UniqueFavCoins}
            data={favs}
            keyExtractor={(_, index) => index.toString()}
            renderItem={CoinListRenderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            maxToRenderPerBatch={2}
            windowSize={3}
          />)}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,

  },
  headerContainer: {
    height: 55,
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
    ...FONTS.h2,
    marginHorizontal: 5,
  },

});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,

  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
