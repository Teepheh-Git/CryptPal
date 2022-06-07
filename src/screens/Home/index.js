import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CoinListRenderItem from '../../components/CoinListRenderItem/CoinListRenderItem';
import CoinCardRenderItem from '../../components/CoinCardRenderItem/CoinCardRenderItem';
import {icons, SIZES} from '../../constants';
import {getCardMarket, getCoinMarket} from '../../stores/market/marketActions';
import LottieView from 'lottie-react-native';
import constants from '../../constants/constants';
import NetworkError from '../../components/NetworkError/NetworkError';
import styles from './styles';
import NotchResponsive from '../../components/NotchResponsive';
import * as Animatable from 'react-native-animatable';

function wait(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

//  SORT COIN CARD FUNCTION
function TopMoverCoins(a, b) {
  return b?.price_change_percentage_24h - a?.price_change_percentage_24h;
}

function FilterCoin(item) {
  return (
    item.sparkline_in_7d.price != [] &&
    item.sparkline_in_7d.price != null &&
    item.sparkline_in_7d.price != ''
  );
}

const Home = ({navigation}) => {
  const {appTheme} = useSelector(state => state.themeReducer);
  const {appCurrency} = useSelector(state => state.currencyReducer);
  const {coinCard, coins} = useSelector(state => state.marketReducer);

  const [homePageLoading, setHomePageLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [tabStatus, setTabStatus] = useState('Popular');
  const [orderByCoin, setOrderByCoin] = useState('market_cap_desc');
  const [retry, setRetry] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  if (coins?.length > 0 && coinCard?.length > 0) {
    setTimeout(() => {
      setHomePageLoading(false);
      setCategoryLoading(false);
    }, 300);
  }

  if (coins == null || coinCard == null) {
    setTimeout(() => {
      setHomePageLoading(false);
    }, 2000);
  }

  const onPullDown = useCallback(
    (currency, orderBy) => {
      setRefreshing(true);

      if (orderByCoin === 'market_cap_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'volume_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'volume_asc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'id_asc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'id_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }
      dispatch(getCardMarket((currency = appCurrency.ticker)));

      wait(3000).then(() => setRefreshing(false));
    },
    [appCurrency, orderByCoin, retry],
  );

  useEffect(
    (currency, orderBy) => {
      if (orderByCoin === 'market_cap_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'volume_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'volume_asc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'id_asc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      if (orderByCoin === 'id_desc') {
        dispatch(
          getCoinMarket(
            (currency = appCurrency.ticker),
            (orderBy = orderByCoin),
          ),
        );
      }

      dispatch(getCardMarket((currency = appCurrency.ticker)));
    },
    [appCurrency, orderByCoin, retry],
  );

  useEffect(
    currency => {
      dispatch(getCardMarket((currency = appCurrency.ticker)));
    },
    [appCurrency],
  );

  // console.log(coins,"koiiiii");

  // HOME PAGE LOADING FUNCTION
  if (homePageLoading) {
    return (
      <View
        style={[
          styles.homePageLoading,
          {backgroundColor: appTheme.backgroundColor5},
        ]}>
        <LottieView
          style={{width: 80, height: 80}}
          source={
            appTheme.name === 'light'
              ? require('../../assets/images/pupr.mp4.lottie.json')
              : require('../../assets/images/black.mp4.lottie.json')
          }
          autoPlay
          loop
        />
      </View>
    );
  }

  // SELECTED TREND TABS
  const setTabStatusFilter = tabStatus => {
    setTabStatus(tabStatus);
    setCategoryLoading(true);
    if (tabStatus === 'Popular') {
      setOrderByCoin('market_cap_desc');
    }
    if (tabStatus === 'Volume ↑') {
      setOrderByCoin('volume_desc');
    }
    if (tabStatus === 'A - Z') {
      setOrderByCoin('id_asc');
    }
    if (tabStatus === 'Volume ↓') {
      setOrderByCoin('volume_asc');
    }
    if (tabStatus === 'Z - A') {
      setOrderByCoin('id_desc');
    }
  };

  // RETRY FUNCTION
  const Retry = () => {
    setHomePageLoading(true);
    let r = Math.random().toString(36).substr(2, 5);
    setRetry(r);
  };

  return (
    <>
      <NotchResponsive color={appTheme.backgroundColor2} />
      <View
        style={[
          styles.container,
          {backgroundColor: appTheme.backgroundColor2},
        ]}>
        {/* MARKET COIN LIST */}
        {coins == null || coinCard == null ? (
          <NetworkError onPress={() => Retry()} />
        ) : (
          <FlatList
            data={coins?.filter(FilterCoin)}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onPullDown}
                title={'Release to update'}
                titleColor={appTheme.textColor2}
                tintColor={appTheme.textColor2}
              />
            }
            renderItem={({item}) => (
              <CoinListRenderItem
                item={item}
                onPress={() => navigation.navigate('CoinDetails', {...item})}
              />
            )}
            ListFooterComponent={
              <>
                <Pressable
                  style={styles.listSeeAllContainer}
                  onPress={() => navigation.navigate('MarketTrends')}>
                  <Text
                    style={[styles.listSeeAll, {color: appTheme.textColor2}]}>
                    See all{' '}
                  </Text>
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      tintColor: appTheme.textColor2,
                    }}
                    source={icons.arrowRight}
                  />
                </Pressable>

                <View
                  style={{
                    height: SIZES.font1,
                  }}
                />
              </>
            }
            ListHeaderComponent={
              <>
                {/* HEADER SECTION */}
                <Animatable.View
                  useNativeDriver={true}
                  animation={'tada'}
                  style={[
                    styles.headerContainer,
                    {backgroundColor: appTheme.backgroundColor2},
                  ]}>
                  <Image
                    resizeMode="cover"
                    style={[styles.imgHeader, {tintColor: appTheme.tintColor}]}
                    source={require('../../assets/images/logo.png')}
                  />
                </Animatable.View>
                <View
                  style={[
                    styles.container,
                    {backgroundColor: appTheme.backgroundColor2},
                  ]}>
                  {/* TOP MOVERS SECTION */}
                  <View style={styles.topMoversContainer}>
                    <View style={styles.topMoversContainer2}>
                      <Text
                        style={[styles.topMovers, {color: appTheme.textColor}]}>
                        Top Movers{' '}
                        <Image
                          resizeMode="cover"
                          style={{width: 20, height: 20}}
                          source={require('../../assets/icons/checkMark.png')}
                        />
                      </Text>
                      <Text
                        style={[styles.last24, {color: appTheme.textColor}]}>
                        Last 24hrs
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TopMovers')}>
                      <Text
                        style={[styles.seeAll, {color: appTheme.textColor2}]}>
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* COIN CARD SECTION */}
                  <Animatable.View
                    useNativeDriver={true}
                    animation={'zoomIn'}
                    duration={400}
                    style={styles.coinCard}>
                    <FlatList
                      // data={[]}
                      data={coinCard?.sort(TopMoverCoins)?.slice(0, 7)}
                      keyExtractor={(_, index) => index.toString()}
                      horizontal
                      decelerationRate={'fast'}
                      snapToInterval={SIZES.width * 0.4}
                      snapToAlignment={'start'}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}) => (
                        <CoinCardRenderItem
                          item={item}
                          onPress={() => {
                            navigation.navigate('CoinDetails', {...item});
                          }}
                        />
                      )}
                    />
                  </Animatable.View>

                  {/* MARKET TRENDS  */}
                  <View style={styles.marketTrendsContainer}>
                    <Text
                      style={[
                        styles.marketTrends,
                        {color: appTheme.textColor},
                      ]}>
                      Market Trends{' '}
                    </Text>
                    <Image
                      resizeMode="cover"
                      style={{width: 20, height: 20}}
                      source={require('../../assets/icons/moneyBag.png')}
                    />
                  </View>

                  {/* MARKET TREND TABS */}

                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={styles.listTab}>
                    {constants.listTab.map((buttonLabel, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.btnTab,
                          tabStatus === buttonLabel.tabStatus &&
                            styles.btnTabActive,
                        ]}
                        onPress={() =>
                          setTabStatusFilter(buttonLabel.tabStatus)
                        }>
                        <Text
                          adjustsFontSizeToFit
                          style={[
                            styles.textTab,
                            tabStatus === buttonLabel.tabStatus &&
                              styles.textTabActive,
                          ]}>
                          {buttonLabel.tabStatus}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  {categoryLoading && (
                    <ActivityIndicator
                      size={'small'}
                      color={appTheme.textColor2}
                    />
                  )}
                </View>
              </>
            }
          />
        )}
      </View>
    </>
  );
};

export default Home;
