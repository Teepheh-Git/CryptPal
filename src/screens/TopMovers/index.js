import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../components/CustomHeader'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import CoinList from '../../components/CoinList'
import { getCoinMarket } from '../../stores/market/marketActions'
import LottieView from 'lottie-react-native';

// import { TopMoverCoins } from '../Home'
import axios from 'axios'
import constants from '../../constants/constants'


function TopMoverCoins(a, b) {
    return (
        b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency ||
        b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency ||
        b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency ||
        b.price_change_percentage_14d_in_currency - a.price_change_percentage_14d_in_currency ||
        b.price_change_percentage_30d_in_currency - a.price_change_percentage_30d_in_currency ||
        b.price_change_percentage_200d_in_currency - a.price_change_percentage_200d_in_currency ||
        b.price_change_percentage_1y_in_currency - a.price_change_percentage_1y_in_currency)
}


const TopMovers = ({ appTheme, navigation, getCoinMarket, coins, route }) => {







    const [currency, setCurrency] = useState('usd')
    const [currencySign, setCurrencySign] = useState('$')
    const [status, setStatus] = useState('24H')

    const [priceChangePerc, setPriceChangePerc] = useState('24h')
    const [coinFetched, setCoinFetched] = useState([])




    const [searchLoading, setSearchLoading] = useState(true)





    if (coinFetched?.length > 0) {
        setTimeout(() => {
            setSearchLoading(false)
        }, 200)
    }


    // const [category, setCategory] = useState('smart-contract-platform')

    // 1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y

    const GetMarketData = async (orderBy = "market_cap_desc", sparkline = true, perPage = 250) => {

        let page = 1
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const data = response.data;
            return data

        } catch (e) {
            alert(e.message)
        }

    }








    useEffect(() => {

        const FetchMarketData = async () => {

            const MarketData = await GetMarketData()
            setCoinFetched(MarketData)
        }

        FetchMarketData()

    }, [priceChangePerc])




    CoinListRenderItem = ({ item }) =>
        <CoinList
            name={item?.name}
            logoUrl={item?.image}
            symbol={item?.symbol.toUpperCase()}
            currentPrice={item?.current_price.toPrecision(2)}
            priceChangePercentageInCurrency={
                item?.price_change_percentage_1h_in_currency ||
                item?.price_change_percentage_24h_in_currency ||
                item?.price_change_percentage_7d_in_currency ||
                item?.price_change_percentage_14d_in_currency ||
                item?.price_change_percentage_30d_in_currency ||
                item?.price_change_percentage_200d_in_currency ||
                item?.price_change_percentage_1y_in_currency
            }
            // priceChangePercentage24h={item?.price_change_percentage_24h}
            chartData={item?.sparkline_in_7d?.price}
            onPress={() => navigation.navigate('CoinDetails', { ...item })}
        />

    setStatusFilter = status => {

        setStatus(status)


        if (status === '1H') {
            setPriceChangePerc('1h')
        } if (status === '24H') {
            setPriceChangePerc('24h')
        } if (status === '7D') {
            setPriceChangePerc('7d')
        } if (status === '2W') {
            setPriceChangePerc('14d')
        } if (status === '1M') {
            setPriceChangePerc('30d')
        } if (status === '6M') {
            setPriceChangePerc('200d')
        } if (status === '1Y') {
            setPriceChangePerc('1y')
        }





    }




    return (searchLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor }}>
        {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop /> : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')} autoPlay loop />}


    </View> : <SafeAreaView style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>

        <View>
            <CustomHeader title='Top Movers ✅' onPress={() => navigation.goBack()} />

        </View>
        <View>

            <View style={styles.listTab}  >
                {
                    constants.topMoversListTab.map((buttonLabel, index) => (
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

            <FlatList
                data={coinFetched.sort(TopMoverCoins).slice(0, 31)}
                keyExtractor={(item) => item.id}
                renderItem={CoinListRenderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={2}
                windowSize={3}
                ListFooterComponent={
                    <View style={{ marginBottom: 50 }} />
                }

            />

        </View>





    </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    Container: {

        flex: 1,
        alignItems: 'center',
        // height: SIZES.height,
        // justifyContent: 'center',
        width: SIZES.width
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
        paddingHorizontal: 5,
        color: COLORS.grey,
        marginHorizontal: 5
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


export default connect(mapStateToProps, mapDispatchToProps)(TopMovers);