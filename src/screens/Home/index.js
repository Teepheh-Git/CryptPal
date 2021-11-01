import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useState, useEffect, useRef } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actionsheet';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import constants from '../../constants/constants'






function TopMoverCoins(a, b) {
    return b.price_change_percentage_24h - a.price_change_percentage_24h
}


const Home = ({ appTheme, appCurrency, getCoinMarket, coins, navigation, item }) => {




    // const [currentPage, setCurrentPage] = useState(1)
    const [homePageLoading, setHomePageLoading] = useState(true)
    const [coinFetched, setCoinFetched] = useState([])
    const [coinListFetched, setCoinListFetched] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const [currency, setCurrency] = useState('usd')
    const [currencySign, setCurrencySign] = useState('$')
    const [status, setStatus] = useState('Popular')
    const [orderBy, setOrderBy] = useState('market_cap_desc')
    const [category, setCategory] = useState('smart-contract-platform')

    const [filteredDataList, setFilteredDataList] = useState(coinListFetched)

    const CardCoinFetched = coinFetched?.sort(TopMoverCoins)




    const GetCardMarketData = async (orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "24h", page = 1, perPage = 250,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            return Data
        } catch (e) {
            alert(e.message)
        }

    }

    const GetListMarketData = async (sparkline = true, priceChangePerc = "24h", page = 1, perPage = 10,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&category=${category}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            // const Data = coinListFetched.concat(response.data);
            const Data = response.data;
            // setIsLoading(false)
            // setFilteredDataList(coinListFetched)
            return Data

        } catch (e) {
            alert(e.message)
        }
    }




    if (coinFetched?.length > 0 && coinListFetched?.length > 0) {
        setTimeout(() => {
            setHomePageLoading(false)
            setFilteredDataList(coinListFetched)
        }, 10)
    }


    // if (coinListFetched.length == undefined || coinFetched.length == undefined) {

    //     return (
    //         <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', top: SIZES.height * 0.2 }}>
    //             <Image style={{ height: 98, width: 98 }} source={require('../../assets/images/Sleepy.png')} />
    //             <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>Network Error! </Text>
    //             <Text style={{ ...FONTS.body4, textAlign: 'center', color: appTheme.textColor3 }}>Your network is asleep, please check your internet connections and click refresh.</Text>
    //         </View>

    //     )

    // }




    useFocusEffect(
        useCallback(() => {
            const FetchListMarketData = async () => {
                const ListMarketData = await GetListMarketData()
                setCoinListFetched(ListMarketData)
            }
            FetchListMarketData();

        }, [appCurrency, orderBy, category],


        ))

    useFocusEffect(
        useCallback(() => {
            const FetchCardMarketData = async () => {
                const MarketData = await GetCardMarketData()
                setCoinFetched(MarketData)
            }
            FetchCardMarketData();
        }, [appCurrency]
        )
    )




    if (homePageLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor2 }}>
                {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop /> : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')} autoPlay loop />}


            </View>
        )
    }


    // RenderFooter = () => {
    //     return (
    //         isLoading ?
    //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor2, marginBottom: 90 }}>
    //                 <ActivityIndicator size='large' color={appTheme.textColor2} />
    //             </View> : null
    //     )
    // }


    // HandleLoadMore = () => {
    //     setCurrentPage(currentPage + 1)
    //     setIsLoading(true)
    // }

    // console.log(appCurrency.ticker)


    CoinCardRenderItem = ({ item }) =>
        <CoinCard
            name={item.name}
            logoUrl={item.image}
            currentPrice={item?.current_price.toLocaleString('en-US')}
            priceChangePercentage24h={item?.price_change_percentage_24h}
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



    // const AnimateHeaderHeight = AnimatedHeaderValue.interpolate({
    //     inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    //     outputRange: [HeaderMaxHeight, HeaderMinHeight],
    //     extrapolate: 'clamp',
    // })



    setStatusFilter = status => {

        setStatus(status)


        if (status === 'Popular') {
            setOrderBy('market_cap_desk')
        }
        if (status === 'Volume') {
            setOrderBy('volume_desc')
        }
        if (status === 'Name') {
            setOrderBy('id_asc')


        }

    }




    const showCurrencyOption = () => {
        actionSheet.current.show()

    }

    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {

            fontSize: 16,
            left: 5,
            top: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
            // borderWidth: 1,
            fontWeight: 'bold',
            // borderColor: appTheme.textColor2,
            borderRadius: 5,
            color: 'white',
            backgroundColor: COLORS.primary,
            paddingRight: 35, // to ensure the text is never behind the icon
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        iconContainer: {
            top: SIZES.height * 0.024,
            right: 15,
        },
    })




    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            {/* Header Section */}
            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2, /*height: AnimateHeaderHeight*/ }]}>
                <Image resizeMode='cover' style={[styles.imgHeader, { tintColor: appTheme.tintColor }]} source={require('../../assets/images/logo.png')} />
            </View>


            {/* Market Coins Lists */}
            <FlatList
                data={coinListFetched?.slice(0, 10)}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={1}
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

                            <RNPickerSelect
                                value={category}
                                style={pickerSelectStyles}
                                onValueChange={(value, itemIndex) =>
                                    setCategory(value)
                                }
                                items={constants.categoryList}
                                Icon={() => {
                                    return <Chevron size={1.5} color={'white'} />;
                                }}
                            />


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
        width: SIZES.width * 0.9,
        alignItems: 'center',

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
        marginBottom: 110,
        flexDirection: 'row',

    },
    listSeeAll: {
        ...FONTS.body4,
        fontWeight: 'bold'

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