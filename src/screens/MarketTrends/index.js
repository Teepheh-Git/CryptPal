import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import CustomHeader from '../../components/CustomHeader'
import CoinList from '../../components/CoinList'
import constants from '../../constants/constants'
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient'
import { getCoinMarket } from '../../stores/market/marketActions'
import styles from './styles'


const MarketTrends = ({ appTheme, getCoinMarket, coins, appCurrency, navigation }) => {

    const [marketPageLoading, setMarketPageLoading] = useState(true)
    const [tabStatus, setTabStatus] = useState('Popular')
    const [orderByCoin, setOrderByCoin] = useState('market_cap_desc')
    const [retry, setRetry] = useState('')


    if (coins?.length > 0) {
        setTimeout(() => {
            setMarketPageLoading(false)
        }, 200)
    }

    if (coins == null) {
        setTimeout(() => {
            setMarketPageLoading(false)
        }, 5000)
    }


    useEffect(() => {
        getCoinMarket(currency = appCurrency.ticker, orderBy = orderByCoin)
    }, [orderByCoin, retry])


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


    const Retry = () => {
        setMarketPageLoading(true)
        let r = Math.random().toString(36).substr(2, 5)
        setRetry(r)
    }

    const NetworkErrorPage = () => {
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
                        style={[styles.btnTab, tabStatus === buttonLabel.tabStatus && styles.btnTabActive]}
                        onPress={() => setTabStatusFilter(buttonLabel.tabStatus)}>
                        <Text style={[styles.textTab, tabStatus === buttonLabel.status && styles.textTabActive]}>{buttonLabel.tabStatus}</Text>
                    </TouchableOpacity>
                ))
                }
            </View>


            {coins == null ? NetworkErrorPage() : <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={CoinListRenderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={50}
                maxToRenderPerBatch={3}
                ListFooterComponent={
                    <View style={{ marginBottom: 50 }} />
                }
            />}
        </SafeAreaView>
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
            return dispatch(getCoinMarket(currency, orderBy, sparkline = true, priceChangePerc, perPage = 50, page))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketTrends);