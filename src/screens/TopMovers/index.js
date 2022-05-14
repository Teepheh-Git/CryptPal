import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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


const TopMovers = ({ navigation }) => {

  const { appTheme } = useSelector(state => state.themeReducer);
  const { appCurrency } = useSelector(state => state.currencyReducer);
  const { coinCard } = useSelector(state => state.marketReducer);


  const dispatch = useDispatch();


  const [tabStatus, setTabStatus] = useState("24H");
  const [coinPriceChangePerc, setCoinPriceChangePerc] = useState("24h");
  const [searchLoading, setSearchLoading] = useState(true);

  if (coinCard?.length > 0) {
    setTimeout(() => {
      setSearchLoading(false);
    }, 3000);
  }
  useEffect((currency, priceChangePerc) => {

    dispatch(getCardMarket(currency = appCurrency.ticker, priceChangePerc = coinPriceChangePerc));
    return () => {
      setTabStatus("24H");
      setSearchLoading(true);
      // setCoinPriceChangePerc("24h");
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


  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>
        <CustomHeader title="Top Movers ✅" onPress={() => navigation.goBack()} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listTab}>
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

          <FlatList
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
    width: SIZES.width * 0.9,
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


export default TopMovers;
