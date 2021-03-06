import React, {useEffect, useState} from 'react';
import {
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
} from 'react-native';
import {useSelector} from 'react-redux';
import CoinDetailsTitle from '../../components/CoinDetailsTitle';
import CustomHeader from '../../components/CustomHeader';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import CoinDetailsInfo from '../../components/CoinDetailsInfo';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoinDetailsChart from '../../components/Chart/CoinDetailsChart';
import axios from 'axios';
import NotchResponsive from '../../components/NotchResponsive';
import config from '../../../config';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';

const CoinDetails = ({route, navigation}) => {
  const {appTheme, error} = useSelector(state => state.themeReducer);
  const {appCurrency} = useSelector(state => state.currencyReducer);

  const dataFromHome = route.params;

  const [favAdded, setFavAdded] = useState(false);
  const [textUnit, setTextUnit] = useState('');
  const [fiatValue, setFiatValue] = useState('0.00');
  const [tokenValue, setTokenValue] = useState('0.00');
  const [swap, setSwap] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(1);

  useEffect(() => {
    const CoinCheck = async () => {
      try {
        const fav = await AsyncStorage.getItem('FavoriteCoin');
        const savedCoin = fav == null ? [] : JSON.parse(fav);

        function findSaved(item) {
          return item === dataFromHome.id;
        }

        const CoinStoredCheck = savedCoin.find(findSaved);
        if (CoinStoredCheck !== undefined) {
          setFavAdded(true);
        }
      } catch (e) {
        console.log(e, 'CheckCoin');
      }
    };

    CoinCheck();
  }, []);

  useEffect(() => {
    const amount = parseFloat(textUnit);

    if (!amount && amount !== 0) {
      setTextUnit('');
      setFiatValue('');
      setTokenValue('');
      return;
    }

    setFiatValue(amount * dataFromHome?.current_price);
    setTokenValue(amount / dataFromHome?.current_price);
  }, [textUnit]);

  const SaveToFavorites = async () => {
    try {
      const fav = await AsyncStorage.getItem('FavoriteCoin');
      const favCoin = (await fav) == null ? [] : JSON.parse(fav);
      favCoin.push(dataFromHome.id);
      setFavAdded(true);
      AsyncStorage.setItem('FavoriteCoin', JSON.stringify(favCoin));
    } catch (err) {
      console.log(err, '@SaveCoinErr');
    }
  };

  const RemoveFromFavorites = async () => {
    try {
      const fav = await AsyncStorage.getItem('FavoriteCoin');
      const favCoin = JSON.parse(fav);
      const filterFav = favCoin.filter(item => item !== dataFromHome.id);

      AsyncStorage.removeItem('FavoriteCoin');
      AsyncStorage.setItem('FavoriteCoin', JSON.stringify(filterFav));
      setFavAdded(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const CurrencyRates = async () => {
      try {
        const res = await axios.get(
          `${config.REACT_APP_CURRENCY_URL}/api/v2/latest?apikey=${config.REACT_APP_CURRENCY_API_KEY}`,
        );

        if (appCurrency.ticker === 'NGN') {
          setCurrencyRate(res.data.data.NGN);
        }
        if (appCurrency.ticker === 'JPY') {
          setCurrencyRate(res.data.data.JPY);
        }
        if (appCurrency.ticker === 'EUR') {
          setCurrencyRate(res.data.data.EUR);
        }
      } catch (e) {
        console.log(e, 'Error currency');
      }
    };
    CurrencyRates();
  }, []);

  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View
        style={[
          styles.container,
          {backgroundColor: appTheme.backgroundColor2},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <CustomHeader
            title="Overview"
            image={icons.overviewGraph}
            onPress={() => navigation.goBack()}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.container,
                {backgroundColor: appTheme.backgroundColor2},
              ]}>
              <CoinDetailsTitle
                name={dataFromHome?.name}
                logoUrl={dataFromHome?.image}
                symbol={dataFromHome?.symbol.toUpperCase()}
                currentPrice={dataFromHome?.current_price}
                priceChangePercentage24h={
                  dataFromHome?.price_change_percentage_24h
                }
              />

              {/*{console.log(dataFromHome?.sparkline_in_7d?.price,"DARAAA")}*/}
              {/*<Chart*/}
              {/*  chartPrices={dataFromHome?.sparkline_in_7d?.price}*/}
              {/*  containerStyle={{*/}
              {/*    marginTop: SIZES.padding,*/}
              {/*    marginHorizontal: 15,*/}
              {/*    flexDirection: "row",*/}
              {/*  }} />*/}

              {/*{console.log(dataFromHome?.sparkline_in_7d?.price)}*/}
              <CoinDetailsChart
                chartPrices={dataFromHome?.sparkline_in_7d?.price?.map(
                  (item, index) => item * currencyRate,
                )}
                containerStyle={{
                  flexDirection: 'row',
                }}
              />

              <Animatable.Text
                useNativeDriver={true}
                duration={400}
                animation={'zoomIn'}
                style={{
                  ...FONTS.body9,
                  color: appTheme.textColor2,
                  alignSelf: 'flex-end',
                  margin: 5,
                  paddingHorizontal: 20,
                }}>
                Updated: {moment(dataFromHome.last_updated).fromNow()}
              </Animatable.Text>

              <View
                style={[
                  styles.coinDetailsContainer,
                  {backgroundColor: appTheme.backgroundColor3},
                ]}>
                <Text style={[styles.coinDetails, {color: appTheme.textColor}]}>
                  Coin Details
                </Text>

                <CoinDetailsInfo
                  title={'MARKET CAP'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.market_cap?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'TRADING VOLUME'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.total_volume?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'24HR HIGH'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.high_24h?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'24HR LOW'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.low_24h?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'ALL TIME HIGH'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.ath?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'ALL TIME HIGH DATE'}
                  value={moment(dataFromHome?.ath_date)?.format('DD/MM/YYYY')}
                />
                <CoinDetailsInfo
                  title={'ALL TIME LOW'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.atl?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'ALL TIME LOW DATE'}
                  value={moment(dataFromHome?.atl_date)?.format('DD/MM/YYYY')}
                />
                <CoinDetailsInfo
                  title={'CIRCULATING SUPPLY'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.circulating_supply?.toLocaleString('en-US')
                  }
                />
                <CoinDetailsInfo
                  title={'TOTAL SUPPLY'}
                  value={
                    appCurrency.symbol +
                    ' ' +
                    dataFromHome?.total_supply?.toLocaleString('en-US')
                  }
                />
              </View>

              <View style={styles.converterContainer}>
                <Text style={[styles.convertCoin, {color: appTheme.textColor}]}>
                  Convert Coin
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <View
                    style={{
                      width: SIZES.width * 0.35,
                      height: SIZES.height * 0.07,
                      borderWidth: 1,
                      flexDirection: 'row',
                      borderColor: appTheme.textColor3,
                      borderRadius: 10,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30, borderRadius: 30}}
                      source={
                        swap ? {uri: dataFromHome.image} : appCurrency.image
                      }
                    />

                    <Text style={{color: appTheme.textColor, ...FONTS.body7}}>
                      {swap
                        ? dataFromHome.symbol.toUpperCase()
                        : appCurrency.ticker}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setSwap(prev => !prev)}
                    style={{
                      width: 44,
                      height: 44,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 44,
                      backgroundColor: appTheme.backgroundColor4,
                    }}>
                    <Image
                      source={icons.swapIcon}
                      style={{width: 22, height: 22}}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: SIZES.width * 0.35,
                      height: SIZES.height * 0.07,
                      borderWidth: 1,
                      flexDirection: 'row',
                      borderColor: appTheme.textColor3,
                      borderRadius: 10,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={
                        swap ? appCurrency.image : {uri: dataFromHome.image}
                      }
                    />
                    <Text style={{color: appTheme.textColor, ...FONTS.body7}}>
                      {swap
                        ? appCurrency.ticker
                        : dataFromHome.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: appTheme.backgroundColor4,
                    height: SIZES.height * 0.13,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <Text style={{color: appTheme.textColor, ...FONTS.h1}}>
                    {swap
                      ? appCurrency.symbol +
                        ' ' +
                        fiatValue?.toLocaleString('en-US')
                      : tokenValue?.toLocaleString('en-US')}
                  </Text>

                  <Text style={{color: appTheme.textColor, ...FONTS.body7}}>
                    {swap
                      ? appCurrency.ticker
                      : dataFromHome.symbol.toUpperCase()}
                  </Text>
                </View>

                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body7,
                    marginVertical: 10,
                  }}>
                  Enter Unit
                </Text>

                <TextInput
                  placeholder="Enter preferred unit"
                  placeholderTextColor={appTheme.textColor3}
                  multiline={false}
                  value={textUnit}
                  onChangeText={setTextUnit}
                  keyboardType={'decimal-pad'}
                  style={{
                    color: appTheme.textColor,
                    borderWidth: 0.5,
                    height: SIZES.height * 0.08,
                    borderRadius: 8,
                    borderColor: COLORS.grey,
                    paddingHorizontal: 10,
                  }}
                />
              </View>

              <Pressable
                onPress={favAdded ? RemoveFromFavorites : SaveToFavorites}>
                {favAdded ? (
                  <LinearGradient
                    style={[styles.root2, {borderColor: appTheme.textColor2}]}
                    colors={[
                      appTheme.backgroundColor2,
                      appTheme.backgroundColor2,
                    ]}>
                    {/*<Image style={{ width: 18, height: 18, tintColor: appTheme.textColor2, marginHorizontal: 10 }}*/}
                    {/*       source={icons.FavCheck} />*/}
                    <Text style={[styles.text, {color: appTheme.textColor2}]}>
                      Remove from Favorite
                    </Text>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    style={styles.root}
                    colors={['#826FD7', '#4F36C4']}>
                    <Text style={styles.text}>Add to Favorite</Text>
                  </LinearGradient>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    alignItems: 'center',
    alignSelf: 'center',
  },

  coinDetailsContainer: {
    width: SIZES.width * 0.9,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  coinDetails: {
    marginBottom: 15,
    ...FONTS.body6,
    // fontWeight: "bold",
  },
  root: {
    width: SIZES.width * 0.7,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 50,
  },
  root2: {
    width: SIZES.width * 0.7,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius2,
    marginVertical: 50,
    flexDirection: 'row',
  },
  text: {
    color: COLORS.white,
    ...FONTS.h8,
  },
  converterContainer: {
    width: SIZES.width * 0.9,

    marginVertical: SIZES.font6,
  },
  convertCoin: {
    alignSelf: 'flex-start',
    ...FONTS.h7,
  },
});

export default CoinDetails;
