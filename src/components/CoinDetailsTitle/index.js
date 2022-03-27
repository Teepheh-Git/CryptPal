import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";
import FastImage from "react-native-fast-image";


const CoinDetailsTitle = ({ appTheme, appCurrency, priceChangePercentage24h, logoUrl, name, symbol, currentPrice }) => {


  const priceChangeColor = priceChangePercentage24h > 0 ? "#34C759" : "#FF3B30";


  return (


    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      {/* CoinName Logo Symbol */}
      <View style={styles.nameLogoSymbol}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: logoUrl,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{ width: 30, height: 30, borderRadius: 30, marginRight: 5 }}
        />
        <View style={styles.nameSymbolContainer}>
          <Text style={[styles.name, { color: appTheme.textColor }]}>{name}</Text>
          <Text style={[styles.symbol, { color: appTheme.textColor3 }]}>{symbol}</Text>
        </View>
      </View>


      {/* Price and percentage price change */}
      <View style={styles.pricePercContainer}>
        <Text
          style={[styles.currentPrice, { color: appTheme.textColor }]}>{appCurrency.symbol + " "}{currentPrice?.toLocaleString("en-US")}</Text>

        <View style={styles.coinPercentage}>
          {priceChangePercentage24h !== 0 && <Image source={icons.arrowUp}
                                                    style={{
                                                      width: 13,
                                                      height: 13,
                                                      tintColor: priceChangeColor,
                                                      transform: priceChangePercentage24h > 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }],
                                                    }} />}

          <Text
            style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h?.toLocaleString("en-US")}%</Text>
        </View>

      </View>


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.9,
    height: SIZES.font1*2,
    padding: 5,
    marginVertical: 1,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  priceChange: {
    ...FONTS.h9,
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
    marginLeft: 5,
  },
  name: {
    ...FONTS.h7,
  },
  symbol: {
    ...FONTS.body9,
    top: 5,
  },
  pricePercContainer: {
    height: SIZES.font1 * 1.5,
    justifyContent: "space-between",
    // backgroundColor: "green",
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

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetailsTitle);
