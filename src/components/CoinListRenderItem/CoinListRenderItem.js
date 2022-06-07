import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import CoinList from '../CoinList';

const CoinListRenderItem = ({item, index, onPress}) => {
  return (
    <CoinList
      name={item?.name}
      logoUrl={item?.image}
      symbol={item?.symbol?.toUpperCase()}
      currentPrice={item?.current_price?.toLocaleString('en-US')}
      priceChangePercentage24h={item?.price_change_percentage_24h}
      chartData={
        item?.sparkline_in_7d?.price !== [] && item?.sparkline_in_7d?.price
      }
      onPress={onPress}
    />
  );
};

export default CoinListRenderItem;
