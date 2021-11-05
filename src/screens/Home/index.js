import React, { useCallback, useState, } from 'react'
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux';
import CoinCard from '../../components/CoinCard';
import CoinList from '../../components/CoinList';
import { useFocusEffect } from '@react-navigation/core';
import { icons } from '../../constants';
import { getCoinMarket, getCardMarket } from '../../stores/market/marketActions';
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import constants from '../../constants/constants'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'



const Home = ({ appTheme, appCurrency, getCoinMarket, getCardMarket, coinCard, coins, navigation, item }) => {

    //  SORT COIN CARD FUNCTION
    function TopMoverCoins(a, b) {
        return b.price_change_percentage_24h - a.price_change_percentage_24h
    }

    const [homePageLoading, setHomePageLoading] = useState(true)
    const [tabStatus, setTabStatus] = useState('Popular')
    const [orderByCoin, setOrderByCoin] = useState('market_cap_desc')
    const [retry, setRetry] = useState('')


    if (coins?.length > 0 && coinCard?.length > 0) {
        setTimeout(() => {
            setHomePageLoading(false)
        }, 1000)
    }

    if (coins == null || coinCard == null) {
        setTimeout(() => {
            setHomePageLoading(false)
        }, 5000)
    }


    useFocusEffect(
        useCallback(() => {
            getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin)
            getCardMarket(currency = appCurrency.ticker)
        }, [appCurrency, orderByCoin, retry])
    )

    // HOME PAGE LOADING FUNCTION
    if (homePageLoading) {
        return (
            <View style={[styles.homePageLoading, { backgroundColor: appTheme.backgroundColor2 }]}>
                {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }}
                    source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop />
                    : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')}
                        autoPlay loop />}
            </View>
        )
    }

    // COIN CARD COMPONENT RENDER ITEM
    CoinCardRenderItem = ({ item }) =>
        <CoinCard
            name={item.name}
            logoUrl={item.image}
            currentPrice={item?.current_price.toLocaleString('en-US')}
            priceChangePercentage24h={item?.price_change_percentage_24h}
            onPress={() => { navigation.navigate('CoinDetails', { ...item }) }}
        />

    // COIN LIST COMPONENT RENDER ITEM
    CoinListRenderItem = ({ item }) =>
        <CoinList
            name={item?.name}
            logoUrl={item?.image}
            symbol={item?.symbol?.toUpperCase()}
            currentPrice={item?.current_price?.toLocaleString('en-US')}
            priceChangePercentage24h={item?.price_change_percentage_24h}
            chartData={item?.sparkline_in_7d?.price}
            onPress={() => navigation.navigate('CoinDetails', { ...item })}
        />


    // SELECTED TREND TABS
    setTabStatusFilter = tabStatus => {
        setTabStatus(tabStatus)
        if (tabStatus === 'Popular') {
            setOrderByCoin('market_cap_desc')
        }
        if (tabStatus === 'Volume ↑') {
            setOrderByCoin('volume_desc')
        }
        if (tabStatus === 'A - Z') {
            setOrderByCoin('id_asc')
        }
        if (tabStatus === 'Volume ↓') {
            setOrderByCoin('volume_asc')
        }
        if (tabStatus === 'Z - A') {
            setOrderByCoin('id_desc')
        }
    }


    // RETRY FUNCTION
    const Retry = () => {
        setHomePageLoading(true)
        let r = Math.random().toString(36).substr(2, 5)
        setRetry(r)
    }

    // NETWORK ERROR FUNCTION
    const NetworkError = () => {
        return (
            <View style={styles.networkErrorContainer}>
                <Image style={{ height: 98, width: 98 }} source={require('../../assets/images/ExpressionLess.png')} />
                <Text style={[styles.networkErrorText, { color: appTheme.textColor }]}>Network error!! </Text>
                <Text style={[styles.networkErrorDesc, { color: appTheme.textColor3 }]}>Your network is asleep, please check your internet connections and click refresh.</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => Retry()}>
                    <LinearGradient style={styles.refreshButton} colors={['#4F36C4', '#4F36C4']}>
                        <Text style={styles.refresh}>Refresh</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
            {/* HEADER SECTION */}
            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
                <Image resizeMode='cover' style={[styles.imgHeader, { tintColor: appTheme.tintColor }]} source={require('../../assets/images/logo.png')} />
            </View>


            {/* MARKET COIN LIST */}
            {coins == null || coinCard == null ? NetworkError() : <FlatList
                data={coins}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={20}
                // maxToRenderPerBatch={3}
                renderItem={CoinListRenderItem}
                // scrollEventThrottle={16}
                ListFooterComponent={
                    <TouchableOpacity style={styles.listSeeAllContainer} onPress={() => navigation.navigate('MarketTrends')}>
                        <Text style={[styles.listSeeAll, { color: appTheme.textColor2 }]}>See all </Text>
                        <Image style={{ width: 16, height: 16, tintColor: appTheme.textColor2 }} source={icons.arrowRight} />
                    </TouchableOpacity>
                }
                ListHeaderComponent={
                    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
                        {/* TOP MOVERS SECTION */}
                        <View style={styles.topMoversContainer}>
                            <View style={styles.topMoversContainer2}>
                                <Text style={[styles.topMovers, { color: appTheme.textColor }]}>Top Movers ✅</Text>
                                <Text style={[styles.last24, { color: appTheme.textColor }]}>Last 24hrs</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('TopMovers', { ...item })}>
                                <Text style={[styles.seeAll, { color: appTheme.textColor2 }]}>See all</Text>
                            </TouchableOpacity>
                        </View>

                        {/* COIN CARD SECTION */}
                        <View style={styles.coinCard}>
                            <FlatList
                                data={coinCard?.sort(TopMoverCoins)?.slice(0, 7)}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={10}
                                maxToRenderPerBatch={2}
                                renderItem={CoinCardRenderItem} />
                        </View>

                        {/* MARKET TRENDS  */}
                        <View style={styles.marketTrendsContainer}>
                            <Text style={[styles.marketTrends, { color: appTheme.textColor }]}>Market Trends 💰</Text>
                        </View>

                        {/* MARKET TREND TABS */}
                        <View style={styles.listTab}  >
                            {constants.listTab.map((buttonLabel, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
                                    onPress={() => setTabStatusFilter(buttonLabel.tabStatus)}>
                                    <Text style={[styles.textTab, tabStatus === buttonLabel.tabStatus && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>}
            />}
        </SafeAreaView >
    )
}



export function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins,
        coinCard: state.marketReducer.coinCard,
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
        appCurrency: state.currencyReducer.appCurrency,
        error: state.currencyReducer.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCoinMarket: (currency, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, orderBy, sparkline = true, priceChangePerc, perPage = 21, page))
        },
        getCardMarket: (currency, orderBy, priceChangePerc, perPage, page) => {
            return dispatch(getCardMarket(currency, orderBy, sparkline = true, priceChangePerc, perPage, page))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

