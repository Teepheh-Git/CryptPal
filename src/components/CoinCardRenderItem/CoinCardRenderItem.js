import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CoinCard from '../CoinCard';

const CoinCardRenderItem = ({item, index, onPress}) => {
  return (
    <CoinCard
      name={item.name}
      logoUrl={item.image}
      currentPrice={item?.current_price.toLocaleString('en-US')}
      priceChangePercentage24h={item?.price_change_percentage_24h}
      onPress={onPress}
    />
  );
};

export default CoinCardRenderItem;
