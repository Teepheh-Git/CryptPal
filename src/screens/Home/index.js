import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux';
import CoinCard from '../../components/CoinCard';
import CoinList from '../../components/CoinList';
import { COLORS, icons, SIZES } from '../../constants';
import { getCoinMarket } from '../../stores/market/marketActions';
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { useNetInfo } from '@react-native-community/netinfo';








const Home = ({ appTheme, getCoinMarket, coins, navigation }) => {




    // const netInfo = useNetInfo()
    // console.log(netInfo.isInternetReachable)


    const [homePageLoading, setHomePageLoading] = useState(true)



    // console.log(coins)


    if (coins.length > 0) {
        setTimeout(() => {
            setHomePageLoading(false)
        }, 2000)
    }



    useFocusEffect(
        useCallback(() => {


            getCoinMarket()

        }, [])
    )




    if (homePageLoading) {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFFFFF" }}>

                <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/cryptpalVid.mp4.lottie.json')} autoPlay loop />

            </View>
        )
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








    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            {/* Header Section */}
            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2, }]}>
                <Image resizeMode='cover' style={[styles.imgHeader, { tintColor: appTheme.tintColor }]} source={require('../../assets/images/logo.png')} />
            </View>


            {/* Market Coins Lists */}
            <FlatList
                data={coins}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={1}
                windowSize={3}
                renderItem={CoinListRenderItem}
                ListFooterComponent={
                    <View style={{
                        marginBottom: SIZES.height * 0.15
                    }} />
                }
                ListHeaderComponent={
                    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

                        {/* Top movers Section */}
                        <View style={styles.topMoversContainer}>
                            <View style={styles.topMoversContainer2}>
                                <Text style={[styles.topMovers, { color: appTheme.textColor }]}>Top Movers ✅</Text>
                                <Text style={[styles.last24, { color: appTheme.textColor }]}>Last 24hrs</Text>
                            </View>
                            <TouchableOpacity onPress={() => console.warn('go to see all')}>
                                <Text style={[styles.seeAll, { color: appTheme.textColor2 }]}>See all</Text>
                            </TouchableOpacity>

                        </View>


                        {/* Coin Card section */}
                        <View style={styles.coinCard}>
                            <FlatList
                                data={coins}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={4}
                                maxToRenderPerBatch={1}
                                windowSize={3}
                                renderItem={CoinCardRenderItem}
                            />
                        </View>



                        {/* Market Trend Tabs */}
                        <View>
                        </View>

                        {/* Market Trends  */}
                        <View style={styles.marketTrendsContainer}>
                            <Text style={[styles.marketTrends, { color: appTheme.textColor }]}>Market Trends 💰</Text>
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
        height: 73.73,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // top: 45,
        // marginBottom: 40,
    },
    imgHeader: {
        width: 85.84,
        height: 73.73,
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