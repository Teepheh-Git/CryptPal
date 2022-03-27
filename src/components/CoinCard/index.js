import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";
import FastImage from "react-native-fast-image";
import { toggleTheme } from "../../stores/theme/themeActions";


const CoinCard = ({ appTheme, appCurrency, name, currentPrice, priceChangePercentage24h, logoUrl, onPress }) => {


  const priceChangeColor = priceChangePercentage24h > 0 ? "#34C759" : "#EB0000";

  return (
    <Pressable onPress={onPress}
               style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: logoUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
        style={{ width: SIZES.font3, height: SIZES.font3, bottom: 5, borderRadius: 15 }}
      />
      <Text
        numberOfLines={1}
        style={[styles.coinName, { color: appTheme.textColor3 }]}>{name}/{appCurrency.ticker}</Text>
      <Text
        numberOfLines={1}
        style={[styles.coinPrice, { color: appTheme.textColor }]}>{appCurrency.symbol + ""} {currentPrice.toLocaleString("en-US")}</Text>
      <View style={styles.coinPercentage}>
        {priceChangePercentage24h !== 0 && <Image source={icons.arrowUp}
                                                  resizeMode={"contain"}
                                                  style={{
                                                    width: 13,
                                                    height: 13,
                                                    tintColor: priceChangeColor,
                                                    transform: priceChangePercentage24h > 0 ? [{ rotate: "0deg" }] : [{ rotate: "180deg" }],
                                                  }} />}

        <Text
          style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h.toLocaleString("en-US")}%</Text>
      </View>

    </Pressable>

  );
};


const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.37,
    height: SIZES.height * 0.16,
    borderRadius: 8,
    padding: SIZES.font10,
    justifyContent: "space-between",
    marginVertical: SIZES.font10,
    marginRight: SIZES.font10,
    elevation: 0.5,
    shadowOpacity: 0.02,
    shadowColor: "#B0B7C3",
    shadowOffset: {
      width: 0.05,
      height: 0.05,
    },
  },
  coinName: {
    ...FONTS.h9,
    // bottom: SIZES.font10,
  },
  coinPrice: {
    ...FONTS.h6,
  },
  priceChange: {
    ...FONTS.h10,
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
