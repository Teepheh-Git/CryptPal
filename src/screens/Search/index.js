import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { FONTS, icons, SIZES } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import FastImage from "react-native-fast-image";


const Search = ({ appTheme, navigation }) => {


  // const [searchCoin, setSearchCoin] = useState("");
  // const [masterData, setMasterData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);


  const [coinSearch, setCoinSearch] = useState("");
  const [coinResult, setCoinResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);


  // const SearchFilter = (text) => {
  //   if (text) {
  //     const newData = masterData?.filter((item) => {
  //       const itemData = item?.name ? item?.name.toUpperCase() : " ".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredData(newData);
  //     setSearchCoin(text);
  //   } else {
  //     setFilteredData(coins);
  //     setSearchCoin(text);
  //   }
  // };


  useEffect(() => {
    const SearchExample = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${coinSearch}`);

        // console.log(res.data.coins, "DATAAA!");
        setCoinResult(res.data.coins);


        if (res) {
          setLoading(false);
        }


      } catch (e) {
        console.error(e, "SearchExampleError");
        setLoading(false);

      }

    };

    if (coinSearch !== "") {
      SearchExample();

    } else {
      // if (coinSearch === "") {
      setCoinResult([]);

      // }
    }

  }, [coinSearch]);


  // useEffect((currency) => {
  //   getCoinMarket(currency = appCurrency.ticker);
  //
  //   // getSearchMarket(currency = appCurrency.ticker)
  //   // getSearchMarket2(currency = appCurrency.ticker)
  //
  //
  //   setFilteredData(coins);
  //   setMasterData(coins);
  //
  //
  // }, [appCurrency]);

  // const FilteredDataCondition = () => {
  //   if (searchCoin === "") {
  //     return [];
  //   } else {
  //     return filteredData;
  //   }
  // };


  const CoinListRenderItem = ({ item }) => {
    return (

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SearchCoinDetails", item.id);

        }}
        style={[styles.box, { backgroundColor: appTheme.backgroundColor }]}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: item?.large,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{
            width: 34,
            height: 34,
            borderRadius: 30,
            marginRight: 5,
          }} />

        <View style={styles.textContainer}>
          <View>
            <Text style={[styles.name, { color: appTheme.textColor }]}>{item?.name}</Text>
            <Text style={[styles.symbol, { color: appTheme.textColor3 }]}>{item.symbol}</Text>
          </View>
          <Text style={[styles.rank, { color: appTheme.textColor3 }]}>Rank: #{item?.market_cap_rank}</Text>

        </View>

      </TouchableOpacity>
    );

  };


  const TopResults = () => {
    // if (searchCoin !== "" && FilteredDataCondition().length !== 0) {
    if (coinSearch !== "" && coinResult.length !== 0) {
      return (
        <View style={{ width: SIZES.width * 0.9, marginTop: 10 }}>
          <Text style={{ alignSelf: "flex-start", color: appTheme.textColor3, ...FONTS.body4 }}>Top Results</Text>
        </View>
      );
    }
  };


  const AboutToSearch = () => {
    return (
      <View style={{ width: SIZES.width * 0.7, alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
        <Image style={{}} source={require("../../assets/images/Thinking.png")} />
        <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>What are you searching for?</Text>
        <Text style={{
          ...FONTS.body4,
          textAlign: "center",
          color: appTheme.textColor3,
        }}>
          Sorry, you'll have to make a search to get any result here.</Text>
      </View>

    );
  };
  const Notfound = () => {
    return (
      <View style={{ width: SIZES.width * 0.7, alignItems: "center", justifyContent: "center", marginVertical: 30 }}>
        <Image style={{}} source={require("../../assets/images/Sad.png")} />
        <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>No result found</Text>
        <Text style={{ ...FONTS.body4, textAlign: "center", color: appTheme.textColor3 }}>Sorry, we couldn't find any
          result in our database</Text>
      </View>
    );
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>


      <CustomHeader title="Search" image={icons.search} onPress={() => navigation.goBack()} />
      <View style={{
        flexDirection: "row",
        width: SIZES.width * 0.9,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 10,
      }}>
        <TextInput
          placeholder={"Search any crypto coin..."}
          value={coinSearch}
          // onChangeText={(text) => SearchFilter(text)}
          onChangeText={value => setCoinSearch(value)}
          placeholderTextColor={appTheme.textColor3}
          onFocus={() => setIsFocused(true)}
          multiline={false}
          style={{
            width: SIZES.width * 0.9,
            height: 55, backgroundColor: appTheme.backgroundColor,
            borderRadius: 8,
            borderWidth: isFocused ? 1 : null,
            borderColor: isFocused ? appTheme.textColor2 : null,
            paddingHorizontal: 15,
            left: 10,
            paddingRight: 30,
            color: appTheme.textColor,
          }}>
        </TextInput>
        <Image style={{ width: 17, height: 17, tintColor: appTheme.textColor3, right: 15 }}
               source={icons.searchBarIcon} />
      </View>


      {/*{searchCoin === "" && AboutToSearch()}*/}

      {/*{searchCoin !== "" && TopResults()}*/}
      {coinSearch !== "" && TopResults()}

      {coinSearch === "" ? AboutToSearch() : (loading ?
          <ActivityIndicator style={{ marginVertical: 15 }} color={appTheme.textColor2} size={"large"} /> :
          <FlatList
            data={coinResult}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            removeClippedSubviews={true}
            ListEmptyComponent={Notfound}
            // getItemLayout={getItemLayout}
            renderItem={CoinListRenderItem}
            // ListHeaderComponent={
            // searchCoin !== "" && FilteredDataCondition().length === 0 && Notfound()c
            // coinSearch !== "" && coinResult.length === 0 && Notfound()
            // }
          />

      )}
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: SIZES.height,
  },

  box: {
    height: 75,
    width: SIZES.width * 0.9,
    padding: 5,
    flexDirection: "row",
    // justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
  textContainer: {
    // backgroundColor: "red",x
    marginLeft: 5,
    width: "90%",
    height: 45,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,

  },
  name: {
    ...SIZES.font3,
  },
  symbol: {
    ...FONTS.body5,
    top: 15,

  },
  rank: {
    ...FONTS.body5,
    top: 5,
    textDecorationLine: "underline",
    fontStyle: "italic",
    alignSelf: "center",

  },

});

export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
