import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import CustomHeader from '../../components/CustomHeader'
import { COLORS, FONTS, SIZES } from '../../constants'
import CoinList from '../../components/CoinList'
import constants from '../../constants/constants'
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import axios from 'axios'
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient'


const MarketTrends = ({ appTheme, appCurrency, navigation }) => {
    const [marketPageLoading, setMarketPageLoading] = useState(true)
    const [coinListFetched, setCoinListFetched] = useState([])
    const [status, setStatus] = useState('Popular')
    const [orderBy, setOrderBy] = useState('market_cap_desc')
    const [category, setCategory] = useState('smart-contract-platform')
    const [retry, setRetry] = useState('')


    const GetListMarketData = async (sparkline = true, priceChangePerc = "24h", page = 1, perPage = 10,) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${appCurrency.ticker}&category=${category}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            return Data
        } catch (e) {
            console.log(e.message)
        }
    }


    if (coinListFetched?.length > 0) {
        setTimeout(() => {
            setMarketPageLoading(false)
        }, 200)
    }

    if (coinListFetched == null) {
        setTimeout(() => {
            setMarketPageLoading(false)
        }, 5000)
    }


    useEffect(() => {
        const FetchListMarketData = async () => {
            const ListMarketData = await GetListMarketData()
            setCoinListFetched(ListMarketData)
        }
        FetchListMarketData();
    }, [orderBy, category, retry])


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


    const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            fontSize: 16,
            width: SIZES.width * 0.5,
            left: 25,
            top: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginVertical: 10,
            fontWeight: 'bold',
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
            top: SIZES.height * 0.034,
            right: 210,
        },
    })

    const Retry = () => {
        setMarketPageLoading(true)
        let r = Math.random().toString(36).substr(2, 5)
        setRetry(r)
    }

    const NetworkErrorPage = () => {
        return (
            <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', top: SIZES.height * 0.2, alignSelf: 'center' }}>
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

    if (marketPageLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor }}>
                {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop /> : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')} autoPlay loop />}
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>
            <CustomHeader title='Market Trends 💰' onPress={() => navigation.goBack()} />
            <View style={styles.listTab}  >
                {constants.listTab.map((buttonLabel, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.btnTab, status === buttonLabel.status && styles.btnTabActive]}
                        onPress={() => setStatusFilter(buttonLabel.status)}>
                        <Text style={[styles.textTab, status === buttonLabel.status && styles.textTabActive]}>{buttonLabel.status}</Text>
                    </TouchableOpacity>
                ))
                }
            </View>

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
            {coinListFetched == null ? NetworkErrorPage() : <FlatList
                data={coinListFetched}
                keyExtractor={(item) => item.id}
                renderItem={CoinListRenderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={2}
                ListFooterComponent={
                    <View style={{ marginBottom: 50 }} />
                }
            />}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
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

    },
    textTab: {
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketTrends);