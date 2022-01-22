import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import CoinList from "../../components/CoinList";
import { FONTS, SIZES } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";


const Favorite = ({ appTheme, navigation }) => {

  const isFocused = useIsFocused();

  const [value, setValue] = useState([]);
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(false);


  let id1 = value[0];
  let id2 = value[1];
  let id3 = value[2];
  let id4 = value[3];
  let id5 = value[4];
  let id6 = value[5];
  let id7 = value[6];
  let id8 = value[7];
  let id9 = value[8];
  let id10 = value[9];

  console.log(value);
  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      GetCoinId();

      setTimeout(() => {
        GetCoinFavorite();

      }, 500);


    }, [isFocused]),
  );

  // useEffect(() => {
  //
  //   GetCoinFavorite();
  //   GetCoinId();
  //
  // }, [isFocused]);


  const GetCoinId = async () => {
    await AsyncStorage.getItem("FavoriteCoin")
      .then((coinGotten) => {
        if (coinGotten !== null) {
          setValue(JSON.parse(coinGotten));
        }

      }).catch(error => {
        alert("ERROR: " + error);
      });
  };

  const GetCoinFavorite = async () => {


    try {
      setLoading(true);

      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id1}%2C${id2}%2C${id3}%2C${id4}%2C${id5}%2C${id6}%2C${id7}%2C${id8}%2C${id9}%2C${id10}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`);

      // console.log(res.data);

      if (res) {
        setLoading(false);
      }
      setFavs(res.data);

    } catch (err) {
      console.log(err, "FAVCOIN ERR");
      setLoading(false);

    }
  };


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
// console.log(value[0])

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
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
