import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useState, useEffect } from 'react'
import {
    StyleSheet, Image, Text, View, TouchableOpacity, FlatList, ActivityIndicator
    , Animated
} from 'react-native'
import { connect } from 'react-redux';
import CoinCard from '../../components/CoinCard';
import CoinList from '../../components/CoinList';

import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { getCoinMarket } from '../../stores/market/marketActions';
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { useNetInfo } from '@react-native-community/netinfo';


const listTab = [
    {
        key: '1',
        status: 'Popular'
    },
    {
        key: '2',
        status: 'A-Z'
    },
    {
        key: '3',
        status: '$5,000+'
    },
    {
        key: '4',
        status: 'Volume'
    },

]



export function TopMoverCoins(a, b) {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
}
function VolumeSort(a, b) {
    return b.total_volume - a.total_volume
} function NameSort(a, b) {
    return a.name - b.name
}



// let AnimatedHeaderValue = new Animated.Value(0)
// const HeaderMaxHeight = 90
// const HeaderMinHeight = 74



const Home = ({ appTheme, getCoinMarket, coins, navigation, item }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [homePageLoading, setHomePageLoading] = useState(true)
    const [coinFetched, setCoinFetched] = useState([])
    const [coinListFetched, setCoinListFetched] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('Popular')
    const [filteredDataList, setFilteredDataList] = useState(coinListFetched)

    const CardCoinFetched = coinFetched.sort(TopMoverCoins)



    const GetCardMarketData = async (currency = "usd", orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "24h", page = 1, perPage = 249,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;

            // console.log(Data)
            return Data

        } catch (e) {
            console.log(e.message)
        }

    }

    const GetListMarketData = async (currency = "usd", orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "24h", perPage = 100,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${currentPage}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = coinListFetched.concat(response.data);
            setIsLoading(false)
            setFilteredDataList(coinListFetched)
            return Data

        } catch (e) {
            console.log(e.message)
        }

    }



    if (coinFetched.length > 0 && coinListFetched.length > 0) {
        setTimeout(() => {
            setHomePageLoading(false)
            setFilteredDataList(coinListFetched)

        }, 200)
    }



    useEffect(() => {
        const FetchListMarketData = async () => {
            const ListMarketData = await GetListMarketData()
            setCoinListFetched(ListMarketData)
            // setFilteredDataList(coinListFetched)
        }
        FetchListMarketData();

    }, [currentPage])



    useEffect(() => {
        const FetchCardMarketData = async () => {
            const MarketData = await GetCardMarketData()
            setCoinFetched(MarketData)
        }
        FetchCardMarketData();
        // setFilteredDataList(coinListFetched)


    }, [])



    if (homePageLoading) {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFFFFF" }}>
                <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/cryptpalVid.mp4.lottie.json')} autoPlay loop />
            </View>
        )
    }


    RenderFooter = () => {
        return (
            isLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor2, marginBottom: 90 }}>
                    <ActivityIndicator size='large' color={appTheme.textColor2} />
                </View> : null
        )
    }


    HandleLoadMore = () => {
        setCurrentPage(currentPage + 1)
        setIsLoading(true)
    }


    CoinCardRenderItem = ({ item }) =>
        <CoinCard
            name={item.name}
            logoUrl={item.image}
            currentPrice={item?.current_price}
            priceChangePercentage24h={item?.price_change_percentage_24h}
        />


    CoinListRenderItem = ({ item }) =>
        <CoinList
            name={item.name}
            logoUrl={item.image}
            symbol={item.symbol.toUpperCase()}
            currentPrice={item.current_price}
            priceChangePercentage24h={item?.price_change_percentage_24h}
            chartData={item?.sparkline_in_7d?.price}
            onPress={() => navigation.navigate('CoinDetails', { ...item })}
        />



    // const AnimateHeaderHeight = AnimatedHeaderValue.interpolate({
    //     inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    //     outputRange: [HeaderMaxHeight, HeaderMinHeight],
    //     extrapolate: 'clamp',
    // })



    setStatusFilter = status => {

        setStatus(status)


        if (status === 'Popular') {
            setFilteredDataList(coinListFetched)
        }
        if (status === 'A-Z') {
            setFilteredDataList([...coinListFetched.filter(item => item.name)])
        }
        if (status === '$5,000+') {
            setFilteredDataList([...coinListFetched.filter(item => item.current_price < 5000)])
        }
        if (status === 'Volume') {
            setFilteredDataList([...coinListFetched.sort(VolumeSort)])
        }
    }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            {/* Header Section */}
            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2, /*height: AnimateHeaderHeight*/ }]}>
                <Image resizeMode='cover' style={[styles.imgHeader, { tintColor: appTheme.tintColor }]} source={require('../../assets/images/logo.png')} />
            </View>


            {/* Market Coins Lists */}
            <FlatList
                data={filteredDataList}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={15}
                maxToRenderPerBatch={2}
                // windowSize={3}
                renderItem={CoinListRenderItem}
                onEndReached={HandleLoadMore}
                onEndReachedThreshold={0}
                scrollEventThrottle={16}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
                //     { useNativeDriver: false }
                // )}
                ListFooterComponent={
                    RenderFooter
                }
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
                                data={CardCoinFetched.slice(0, 5)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={4}
                                maxToRenderPerBatch={2}
                                // windowSize={3}
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
                                listTab.map(i => (
                                    <TouchableOpacity
                                        style={[styles.btnTab, status === i.status && styles.btnTabActive]}
                                        onPress={() => setStatusFilter(i.status)}
                                    >
                                        <Text style={[styles.textTab, status === i.status && styles.textTabActive]}>{i.status}</Text>
                                    </TouchableOpacity>

                                ))

                            }
                        </View>




                    </View>
                }
            />


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
        marginBottom: 30
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
        width: SIZES.width * 0.9

    },
    btnTab: {
        height: 40,
        marginHorizontal: 10,
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
    }
})


export function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins,
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
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