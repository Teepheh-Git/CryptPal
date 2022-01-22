import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { icons, SIZES } from "../../constants";
import FastImage from "react-native-fast-image";
import { toggleTheme } from "../../stores/theme/themeActions";


const CoinCard = ({ appTheme, appCurrency, name, currentPrice, priceChangePercentage24h, logoUrl, onPress }) => {


  const priceChangeColor = priceChangePercentage24h > 0 ? "#34C759" : "#EB0000";

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}
                      style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: logoUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={{ width: 24, height: 24, bottom: 5, borderRadius: 15 }}
      />
      <Text style={[styles.coinName, { color: appTheme.textColor3 }]}>{name}/{appCurrency.ticker}</Text>
      <Text numberOfLines={1}
            style={[styles.coinPrice, { color: appTheme.textColor }]}>{appCurrency.symbol + ""} {currentPrice.toLocaleString("en-US")}</Text>
      <View style={styles.coinPercentage}>
        {priceChangePercentage24h !== 0 && <Image source={icons.arrowUp}
                                                  style={{
                                                   width: 13,
                                                   height: 13,
                                                   tintColor: priceChangeColor,
                                                   transform: priceChangePercentage24h > 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }],
                                                 }} />}

        <Text
          style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h.toLocaleString("en-US")}%</Text>
      </View>

    </TouchableOpacity>

  );
};


const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.3,
    height: SIZES.height * 0.14,
    borderRadius: 8,
    padding: 15,
    justifyContent: "space-between",
    // marginVertical: 5,
    marginVertical:10,
    marginRight:15,
    elevation: 0.5,
    shadowOpacity: 0.02,
    shadowColor:'#B0B7C3',
    shadowOffset: {
      width: 0.05,
      height: 0.05,
    },
  },
  coinName: {
    fontSize: SIZES.font5,
    fontWeight: "normal",
    bottom: 5,
  },
  coinPrice: {
    fontSize: SIZES.font2,
    fontWeight: "bold",

  },
  priceChange: {
    fontSize: SIZES.font5,

  },
  coinPercentage: {
    flexDirection: "row",
    alignItems: "center",
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
  return {
    toggleTheme: themeType => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinCard);
