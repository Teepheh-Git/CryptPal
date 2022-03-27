import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import FastImage from "react-native-fast-image";

const CoinList = ({
                    appTheme,
                    appCurrency,
                    priceChangePercentage24h,
                    priceChangePercentageInCurrency,
                    logoUrl,
                    name,
                    symbol,
                    currentPrice,
                    chartData,
                    onPress,
                    onLongPress,
                  }) => {


  const priceChangeColorForChart = priceChangePercentage24h > 0 ? COLORS.primary : COLORS.primary;
  const priceChangeColorForChartInCurrency = priceChangePercentageInCurrency > 0 ? COLORS.primary : COLORS.primary;


  const priceChangeColor = priceChangePercentage24h > 0 ? "#34C759" : "#EB0000";
  const priceChangeColorInCurrency = priceChangePercentageInCurrency > 0 ? "#34C759" : "#EB0000";


  return (
    <Pressable
      onLongPress={onLongPress}
      style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}
      onPress={onPress}>


      {/* CoinName Logo Symbol */}
      <View style={styles.nameLogoSymbol}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: logoUrl,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{
            width: SIZES.font1,
            height: SIZES.font1,
            borderRadius: 30,
          }} />
        <View style={styles.nameSymbolContainer}>
          <Text style={[styles.name, { color: appTheme.textColor }]}>{name}</Text>
          <Text style={[styles.symbol, { color: appTheme.textColor3 }]}>{symbol}</Text>
        </View>
      </View>


      {/* Coin Chart */}
      <LineChart
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withDots={false}
        withInnerLines={false}
        withVerticalLines={false}
        withOuterLines={false}
        bezier
        data={{
          datasets: [{ data: chartData !== [] && chartData }],
        }}
        width={80}
        height={73}
        chartConfig={{
          color: () => priceChangeColorForChart,
          backgroundColor: "#ffffff",
          backgroundGradientFrom: appTheme.backgroundColor,
          backgroundGradientTo: appTheme.backgroundColor,
          strokeWidth: 1,
          fillShadowGradient: COLORS.primary,
          fillShadowGradientOpacity: 0.4,
        }}
        style={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      />

      {/* Price and percentage price change */}
      <View style={styles.pricePercContainer}>
        <Text
          style={[styles.currentPrice, { color: appTheme.textColor }]}>{appCurrency.symbol + " "}{currentPrice?.toLocaleString("en-US")}</Text>

        {priceChangePercentage24h ? <View style={styles.coinPercentage}>
            {priceChangePercentage24h !== 0 && <Image source={icons.arrowUp}
                                                      style={{
                                                        width: 13,
                                                        height: 13,
                                                        tintColor: priceChangeColor,
                                                        transform: priceChangePercentage24h > 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }],
                                                      }} />}
            <Text
              style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h?.toLocaleString("en-US")}%</Text>
          </View> :

          <View style={styles.coinPercentage}>
            {priceChangePercentageInCurrency !== 0 && <Image source={icons.arrowUp}
                                                             style={{
                                                               width: 13,
                                                               height: 13,
                                                               tintColor: priceChangeColorInCurrency,
                                                               transform: priceChangePercentageInCurrency > 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }],
                                                             }} />}
            <Text
              style={[styles.priceChange, { color: priceChangeColorInCurrency }]}> {priceChangePercentageInCurrency?.toLocaleString("en-US")}%</Text>

          </View>}


      </View>


    </Pressable>
  );
};


const styles = StyleSheet.create({

  container: {
    width: SIZES.width * 0.9,
    height: SIZES.font1 * 2.3,
    paddingHorizontal: 15,
    padding: 5,
    marginVertical: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderRadius: 10,
    // elevation: 3,
    shadowOpacity: 0.02,
    shadowColor: "#B0B7C3",
    shadowOffset: {
      width: 0.05,
      height: 0.05,
    },

  },
  priceChange: {
    ...FONTS.h8,
    fontWeight: "400",

  },
  coinPercentage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nameLogoSymbol: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.font1 * 1.5,
    width: SIZES.width * 0.3,
  },
  nameSymbolContainer: {
    marginLeft: SIZES.font10,
    justifyContent: "space-between",
    height: SIZES.font1 * 1.5,
  },
  name: {
    ...FONTS.h7,
  },
  symbol: {
    ...FONTS.body9,
  },
  pricePercContainer: {
    height: SIZES.font1 * 1.5,
    justifyContent: "space-between",
  },
  currentPrice: {
    ...FONTS.h6,
    textAlign: "right",
  },
});

export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
    appCurrency: state.currencyReducer.appCurrency,
    // error: state.currencyReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinList);
