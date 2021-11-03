import React, { useCallback, useState, } from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Platform
} from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';
import CoinCard from '../../components/CoinCard';
import CoinList from '../../components/CoinList';
import { useFocusEffect } from '@react-navigation/core';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { getCoinMarket } from '../../stores/market/marketActions';
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import constants from '../../constants/constants'
import LinearGradient from 'react-native-linear-gradient';





function TopMoverCoins(a, b) {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
}


const Home = ({ appTheme, appCurrency, getCoinMarket, coins, navigation, item }) => {

    const [homePageLoading, setHomePageLoading] = useState(true)
    const [coinFetched, setCoinFetched] = useState([])
    const [coinListFetched, setCoinListFetched] = useState([])
    const [status, setStatus] = useState('Popular')
    const [orderBy, setOrderBy] = useState('market_cap_desc')
    const [category, setCategory] = useState('smart-contract-platform')
    const [retry, setRetry] = useState('')

    const [filteredDataList, setFilteredDataList] = useState(coinListFetched)

    const CardCoinFetched = coinFetched?.sort(TopMoverCoins)




    const GetCardMarketData = async (orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "24h", page = 1, perPage = 250,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            return Data
        } catch (e) {
            // alert(e.message)
        }

    }

    const GetListMarketData = async (sparkline = true, priceChangePerc = "24h", page = 1, perPage = 10,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            return Data
        } catch (e) {
            // alert(e.message)
        }
    }




    if (coinFetched?.length > 0 && coinListFetched?.length > 0) {
        setTimeout(() => {
            setHomePageLoading(false)
            setFilteredDataList(coinListFetched)
        }, 10)
    }


    if (coinFetched == null || coinListFetched == null) {
        setTimeout(() => {
            setHomePageLoading(false)
        }, 5000)
    }



    useFocusEffect(
        useCallback(() => {
            const FetchListMarketData = async () => {
                const ListMarketData = await GetListMarketData()
                setCoinListFetched(ListMarketData)
            }
            FetchListMarketData();
        }, [appCurrency, orderBy, category, retry])
    )

    useFocusEffect(
        useCallback(() => {
            const FetchCardMarketData = async () => {
                const MarketData = await GetCardMarketData()
                setCoinFetched(MarketData)
            }
            FetchCardMarketData();
        }, [appCurrency, retry])
    )




    if (homePageLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor2 }}>
                {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }}
                    source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop />
                    : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')}
                        autoPlay loop />}
            </View>
        )
    }



    CoinCardRenderItem = ({ item }) =>
        <CoinCard
            name={item.name}
            logoUrl={item.image}
            currentPrice={item?.current_price.toLocaleString('en-US')}
            priceChangePercentage24h={item?.price_change_percentage_24h}
            onPress={() => { navigation.navigate('CoinDetails', { ...item }) }}
        />


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





    setStatusFilter = status => {

        setStatus(status)

        if (status === 'Popular') {
            setOrderBy('market_cap_desk')
        }
        if (status === 'Volume ↑') {
            setOrderBy('volume_desc')
        }
        if (status === 'A - Z') {
            setOrderBy('id_asc')
        }
        if (status === 'Volume ↓') {
            setOrderBy('volume_asc')
        }
        if (status === 'Z - A') {
            setOrderBy('id_desc')
        }
    }

    const Retry = () => {
        setHomePageLoading(true)
        let r = Math.random().toString(36).substr(2, 5)
        setRetry(r)
    }

    const NetworkError = () => {
        return (
            <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', top: SIZES.height * 0.2 }}>
                <Image style={{ height: 98, width: 98 }} source={require('../../assets/images/Sleepy.png')} />
                <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>Network error!! </Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center', color: appTheme.textColor3 }}>Your network is asleep, please check your internet connections and click refresh.</Text>


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

            {/* Header Section */}
            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
                <Image resizeMode='cover' style={[styles.imgHeader, { tintColor: appTheme.tintColor }]} source={require('../../assets/images/logo.png')} />
            </View>


            {/* Market Coins Lists */}

            {coinListFetched == null || CardCoinFetched == null ? NetworkError() : <FlatList
                data={coinListFetched?.slice(0, 10)}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={2}
                renderItem={CoinListRenderItem}
                // onEndReached={HandleLoadMore}
                // onEndReachedThreshold={0}
                scrollEventThrottle={16}
                ListFooterComponent={



                    <TouchableOpacity style={styles.listSeeAllContainer} onPress={() => navigation.navigate('MarketTrends')}>
                        <Text style={[styles.listSeeAll, { color: appTheme.textColor2 }]}>See all </Text>
                        <Image style={{ width: 16, height: 16, tintColor: appTheme.textColor2 }} source={icons.arrowRight} />



                    </TouchableOpacity>}
                ListHeaderComponent={
                    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

                        {/* Top movers Section */}
                        <View style={styles.topMoversContainer}>
                            <View style={styles.topMoversContainer2}>
                                <Text style={[styles.topMovers, { color: appTheme.textColor }]}>Top Movers ✅</Text>
                                <Text style={[styles.last24, { color: appTheme.textColor }]}>Last 24hrs</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('TopMovers', { ...item })}>
                                <Text style={[styles.seeAll, { color: appTheme.textColor2 }]}>See all</Text>
                            </TouchableOpacity>

                        </View>


                        {/* Coin Card section */}
                        <View style={styles.coinCard}>
                            <FlatList
                                data={CardCoinFetched?.slice(0, 7)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={10}
                                maxToRenderPerBatch={2}
                                renderItem={CoinCardRenderItem}
                            />



                        </View>





                        {/* Market Trends  */}
                        <View style={styles.marketTrendsContainer}>
                            <Text style={[styles.marketTrends, { color: appTheme.textColor }]}>Market Trends 💰</Text>
                        </View>


                        {/* Market Trend Tabs */}

                        <View style={styles.listTab}  >
                            {
                                constants.listTab.map((buttonLabel, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.btnTab, status === buttonLabel.status && styles.btnTabActive]}
                                        onPress={() => setStatusFilter(buttonLabel.status)}
                                    >
                                        <Text style={[styles.textTab, status === buttonLabel.status && styles.textTabActive]}>{buttonLabel.status}</Text>
                                    </TouchableOpacity>

                                ))
                            }

                        </View>
                    </View>
                }
            />

            }


        </SafeAreaView >

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // top: 45,
        // marginBottom: 40,
    },
    imgHeader: {
        width: 85.84,
        height: 74,
        top: 5
    },
    topMoversContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width * 0.95,
        height: 63
    },
    topMoversContainer2: {
        justifyContent: 'space-between',
        height: 43
    },
    topMovers: {
        fontSize: SIZES.font2,
        fontWeight: 'bold',
        lineHeight: 24
    },
    last24: {
        fontSize: SIZES.font4,
        fontWeight: '100',
    },
    seeAll: {
        fontSize: SIZES.font4,
        fontWeight: 'normal',
    },
    coinCard: {
        height: 130,
        marginBottom: 10
    },
    marketTrendsContainer: {
        width: SIZES.width * 0.9,
        marginVertical: 10,
    },
    marketTrends: {
        fontSize: SIZES.font2,
        fontWeight: 'bold',
        lineHeight: 24

    },
    listTab: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: SIZES.width * 0.9,
        alignItems: 'center',
        marginBottom: 10

    },
    btnTab: {
        height: 40,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 0.25,
        alignItems: 'center',
        borderColor: COLORS.grey,
        borderRadius: 5,
        justifyContent: 'center'

    }, textTab: {
        ...FONTS.body5,
        marginHorizontal: 5,
        color: COLORS.grey,
    },
    btnTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    textTabActive: {
        color: 'white'
    },
    listSeeAllContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 5,
        alignItems: 'center',
        marginBottom: Platform.OS === "ios" ? 110 : 130,
        marginTop: Platform.OS === "ios" ? 10 : 20,
        flexDirection: 'row',

    },
    listSeeAll: {
        ...FONTS.body3,
        fontWeight: 'bold'

    },
    refreshButton: {
        width: SIZES.width * 0.34,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius3,
        marginVertical: 40,
    },
    refresh: {
        color: COLORS.white,
        ...FONTS.h5,
    }

})


export function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins,
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
        appCurrency: state.currencyReducer.appCurrency,
        error: state.currencyReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);