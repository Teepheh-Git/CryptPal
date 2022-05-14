import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../../components/CustomHeader";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import CoinDetailsInfo from "../../components/CoinDetailsInfo";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoinDetailsChart from "../../components/Chart/CoinDetailsChart";
import axios from "axios";
import CoinDetailsTitle from "../../components/CoinDetailsTitle";
import NotchResponsive from "../../components/NotchResponsive";
import config from "../../../config";

const SearchCoinDetails = ({ route, navigation }) => {


  const { appTheme, error } = useSelector(state => state.themeReducer);
  const { appCurrency } = useSelector(state => state.currencyReducer);
  const coinId = route.params;


  const [favAdded, setFavAdded] = useState(false);
  const [textUnit, setTextUnit] = useState("");
  const [fiatValue, setFiatValue] = useState("0.00");
  const [tokenValue, setTokenValue] = useState("0.00");
  const [swap, setSwap] = useState(true);
  const [fullDetails, setFullDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(1);


  useEffect(() => {
    const CoinCheck = async () => {
      try {
        const fav = await AsyncStorage.getItem("FavoriteCoin");
        const savedCoin = !fav ? [] : JSON.parse(fav);
        const CoinStoredCheck = savedCoin.find((item) => {
          return item === coinId;
        });
        if (!CoinStoredCheck) {
          setFavAdded(true);
        }
      } catch (e) {
        console.log(e, "CheckCoin");
      }
    };
    CoinCheck();
  }, []);


  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${config.REACT_APP_COIN_BASE_URL}/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=24h`);
        setFullDetails(result.data[0]);
        if (result) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e, "getDetailsError");
        setLoading(false);
      }
    };
    getDetails();
    CurrencyRates();
  }, []);


  useEffect(() => {
    const amount = parseFloat(textUnit);

    if (!amount && amount !== 0) {
      setTextUnit("");
      setFiatValue("");
      setTokenValue("");
      return;
    }

    // setFiatValue((amount * dataFromHome?.current_price));
    // setTokenValue((amount / dataFromHome?.current_price));

    setFiatValue((amount * fullDetails?.current_price));
    setTokenValue((amount / fullDetails?.current_price));


  }, [textUnit]);


  const SaveToFavorites = async () => {
    try {
      const fav = await AsyncStorage.getItem("FavoriteCoin");
      const favCoin = !fav ? [] : JSON.parse(fav);
      favCoin.push(fullDetails.id);
      setFavAdded(true);
      AsyncStorage.setItem("FavoriteCoin", JSON.stringify(favCoin));
    } catch (err) {
      console.log(err, "@SaveCoinErr");
    }
  };

  const RemoveFromFavorites = async () => {

    try {
      const fav = await AsyncStorage.getItem("FavoriteCoin");
      const favCoin = JSON.parse(fav);
      const filterFav = favCoin.filter(item => item !== fullDetails.id);
      console.log(filterFav);
      AsyncStorage.removeItem("FavoriteCoin");
      AsyncStorage.setItem("FavoriteCoin", JSON.stringify(filterFav));
      setFavAdded(false);
    } catch (e) {
      console.log(e);
    }
  };


  const CurrencyRates = async () => {
    try {
      const res = await axios.get(`${config.REACT_APP_CURRENCY_URL}/api/v2/latest?apikey=${config.REACT_APP_CURRENCY_API_KEY}`);
      if (appCurrency.ticker === "NGN") {
        setCurrencyRate(res.data.data.NGN);
      }
      if (appCurrency.ticker === "JPY") {
        setCurrencyRate(res?.data?.data.JPY);
      }
      if (appCurrency.ticker === "EUR") {
        setCurrencyRate(res.data.data.EUR);
      }
    } catch (e) {
      console.log(e, "Error currency");
    }
  };


  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <CustomHeader title="Overview" image={icons.overviewGraph} onPress={() => navigation.goBack()} />
          {loading ? <ActivityIndicator size={"large"} color={appTheme.textColor2} /> :
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
                <CoinDetailsTitle
                  name={fullDetails?.name}
                  logoUrl={fullDetails?.image}
                  symbol={fullDetails?.symbol?.toUpperCase()}
                  currentPrice={fullDetails?.current_price}
                  priceChangePercentage24h={fullDetails?.price_change_percentage_24h}
                />
                <CoinDetailsChart
                  chartPrices={(fullDetails?.sparkline_in_7d?.price)?.map((item, index) => (item * currencyRate))}
                  containerStyle={{ flexDirection: "row" }}
                />
                <Text style={{
                  color: appTheme.textColor2,
                  alignSelf: "flex-end",
                  margin: 15,
                }}>Updated: {moment(fullDetails.last_updated).fromNow()}</Text>
                <View style={[styles.coinDetailsContainer, { backgroundColor: appTheme.backgroundColor3 }]}>
                  <Text style={[styles.coinDetails, { color: appTheme.textColor }]}>Coin Details</Text>
                  <CoinDetailsInfo title={"MARKET CAP"}
                                   value={appCurrency.symbol + " " + fullDetails?.market_cap?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"TRADING VOLUME"}
                                   value={appCurrency.symbol + " " + fullDetails?.total_volume?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"24HR HIGH"}
                                   value={appCurrency.symbol + " " + fullDetails?.high_24h?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"24HR LOW"}
                                   value={appCurrency.symbol + " " + fullDetails?.low_24h?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"ALL TIME HIGH"}
                                   value={appCurrency.symbol + " " + fullDetails?.ath?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"ALL TIME HIGH DATE"}
                                   value={moment(fullDetails?.ath_date)?.format("DD/MM/YYYY")} />
                  <CoinDetailsInfo title={"ALL TIME LOW"}
                                   value={appCurrency.symbol + " " + fullDetails?.atl?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"ALL TIME LOW DATE"}
                                   value={moment(fullDetails?.atl_date)?.format("DD/MM/YYYY")} />
                  <CoinDetailsInfo title={"CIRCULATING SUPPLY"}
                                   value={appCurrency.symbol + " " + fullDetails?.circulating_supply?.toLocaleString("en-US")} />
                  <CoinDetailsInfo title={"TOTAL SUPPLY"}
                                   value={appCurrency.symbol + " " + fullDetails?.total_supply?.toLocaleString("en-US")} />
                </View>
                <View style={styles.converterContainer}>
                  <Text style={[styles.convertCoin, { color: appTheme.textColor }]}>Convert Coin</Text>

                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginVertical: 15,
                  }}>
                    <View style={{
                      width: SIZES.width * 0.35,
                      height: SIZES.height * 0.07,
                      borderWidth: 1,
                      flexDirection: "row",
                      borderColor: appTheme.textColor3,
                      borderRadius: 10,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}>

                      <Image style={{ width: 30, height: 30, borderRadius: 30 }}
                             source={swap ? { uri: fullDetails.image } : appCurrency.image} />


                      <Text
                        style={{ color: appTheme.textColor, ...FONTS.body7 }}>{swap ? fullDetails?.symbol?.toUpperCase() : appCurrency.ticker}</Text>

                    </View>

                    <TouchableOpacity onPress={() => setSwap(prevState => !prevState)}
                                      style={{
                                        width: 44,
                                        height: 44,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 44,
                                        backgroundColor: appTheme.backgroundColor4,
                                      }}>
                      <Image source={icons.swapIcon} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>

                    <View style={{
                      width: SIZES.width * 0.35,
                      height: SIZES.height * 0.07,
                      borderWidth: 1,
                      flexDirection: "row",
                      borderColor: appTheme.textColor3,
                      borderRadius: 10,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}>

                      <Image style={{ width: 30, height: 30 }}
                             source={swap ? appCurrency.image : { uri: fullDetails.image }} />
                      <Text
                        style={{ color: appTheme.textColor, ...FONTS.body7 }}>{swap ? appCurrency.ticker : fullDetails.symbol.toUpperCase()}</Text>

                    </View>
                  </View>


                  <View style={{
                    backgroundColor: appTheme.backgroundColor3,
                    height: SIZES.height * 0.13,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 15,
                  }}>


                    <Text
                      style={{ color: appTheme.textColor, ...FONTS.h1 }}>{swap ? appCurrency.symbol + " " + fiatValue?.toLocaleString("en-US") : tokenValue?.toLocaleString("en-US")}</Text>
                    <Text
                      style={{ color: appTheme.textColor, ...FONTS.body7 }}>{swap ? appCurrency.ticker : fullDetails.symbol.toUpperCase()}</Text>
                  </View>
                  <Text style={{ color: appTheme.textColor, ...FONTS.body7, marginVertical: 10 }}>Enter Unit</Text>
                  <TextInput
                    placeholder="Enter preferred unit"
                    placeholderTextColor={appTheme.textColor3}
                    multiline={false}
                    value={textUnit}
                    onChangeText={setTextUnit}
                    keyboardType={"decimal-pad"}
                    style={{
                      color: appTheme.textColor,
                      borderWidth: 0.5,
                      height: SIZES.height * 0.06,
                      borderRadius: 8,
                      borderColor: COLORS.grey,
                      paddingHorizontal: 10,
                    }}
                  />
                </View>
                <Pressable onPress={favAdded ? RemoveFromFavorites : SaveToFavorites}>
                  {favAdded ? <LinearGradient style={[styles.root2, { borderColor: appTheme.textColor2 }]}
                                              colors={[appTheme.backgroundColor2, appTheme.backgroundColor2]}>
                      <Image style={{ width: 18, height: 18, tintColor: appTheme.textColor2, marginHorizontal: 10 }}
                             source={icons.FavCheck} />
                      <Text style={[styles.text, { color: appTheme.textColor2 }]}>Added to Favorite</Text>
                    </LinearGradient> :
                    <LinearGradient style={styles.root} colors={["#826FD7", "#4F36C4"]}>
                      <Text style={styles.text}>Add to Favorite</Text>
                    </LinearGradient>
                  }
                </Pressable>

              </View>
            </ScrollView>}


        </KeyboardAvoidingView>
      </View>

    </>


  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: SIZES.width,
    alignItems: "center",
    alignSelf: "center",
  },

  coinDetailsContainer: {
    width: SIZES.width * 0.9,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  coinDetails: {
    marginVertical: 5,
    ...FONTS.body6,
    // fontWeight: "bold",

  },
  root: {

    width: SIZES.width * 0.7,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius2,
    marginVertical: 50,

  },
  root2: {
    width: SIZES.width * 0.7,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: SIZES.radius2,
    marginVertical: 50,
    flexDirection: "row",

  },
  text: {
    color: COLORS.white,
    ...FONTS.h9,
  },
  converterContainer: {
    width: SIZES.width * 0.9,
    // alignItems: 'flex-start',

    marginVertical: 30,

  },
  convertCoin: {
    alignSelf: "flex-start",
    ...FONTS.h7,
  },

});


export default SearchCoinDetails;
