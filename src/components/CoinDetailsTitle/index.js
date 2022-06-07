import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FONTS, icons, SIZES} from '../../constants';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';

const CoinDetailsTitle = ({
  priceChangePercentage24h,
  logoUrl,
  name,
  symbol,
  currentPrice,
}) => {
  const {appTheme} = useSelector(state => state.themeReducer);
  const {appCurrency} = useSelector(state => state.currencyReducer);
  const priceChangeColor = priceChangePercentage24h > 0 ? '#34C759' : '#FF3B30';

  return (
    <View
      style={[styles.container, {backgroundColor: appTheme.backgroundColor2}]}>
      {/* CoinName Logo Symbol */}
      <View style={styles.nameLogoSymbol}>
        <SharedElement id={logoUrl}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: logoUrl,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{width: 30, height: 30, borderRadius: 30, marginRight: 5}}
          />
        </SharedElement>

        <View style={styles.nameSymbolContainer}>
          <Text style={[styles.name, {color: appTheme.textColor}]}>{name}</Text>
          <Text style={[styles.symbol, {color: appTheme.textColor3}]}>
            {symbol}
          </Text>
        </View>
      </View>

      {/* Price and percentage price change */}
      <View style={styles.pricePercContainer}>
        <Text style={[styles.currentPrice, {color: appTheme.textColor}]}>
          {appCurrency.symbol + ' '}
          {currentPrice?.toLocaleString('en-US')}
        </Text>

        <View style={styles.coinPercentage}>
          {priceChangePercentage24h !== 0 && (
            <Image
              source={icons.arrowUp}
              resizeMode={'contain'}
              style={{
                width: 13,
                height: 13,
                tintColor: priceChangeColor,
                transform:
                  priceChangePercentage24h > 0
                    ? [{rotate: '0deg'}]
                    : [{rotate: '180deg'}],
              }}
            />
          )}

          <Text style={[styles.priceChange, {color: priceChangeColor}]}>
            {' '}
            {priceChangePercentage24h?.toLocaleString('en-US')}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width * 0.9,
    height: SIZES.font1 * 2,
    padding: 5,
    marginVertical: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  priceChange: {
    ...FONTS.h10,
  },
  coinPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameLogoSymbol: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SIZES.font1 * 1.5,
    width: SIZES.width * 0.3,
  },
  nameSymbolContainer: {
    marginLeft: 5,
  },
  name: {
    ...FONTS.h8,
  },
  symbol: {
    ...FONTS.body10,
    top: 5,
  },
  pricePercContainer: {
    height: SIZES.font1 * 1.5,
    justifyContent: 'space-between',
    // backgroundColor: "green",
  },
  currentPrice: {
    ...FONTS.h7,
    textAlign: 'right',
  },
});

export default CoinDetailsTitle;
