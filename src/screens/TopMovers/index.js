import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../components/CustomHeader'
import { icons, SIZES } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import CoinList from '../../components/CoinList'
import { getCoinMarket } from '../../stores/market/marketActions'
import { TopMoverCoins } from '../Home'


const TopMovers = ({ appTheme, navigation, getCoinMarket, coins, route }) => {



    const GetMarketData = async (currency = "usd", orderBy = "market_cap_desc", sparkline = true, priceChangePerc = "24h", perPage = 50,) => {

        let page = 1
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const data = response.data;
            return data

        } catch (e) {
            console.log(e.message)
        }

    }




    const [coinFetched, setCoinFetched] = useState([])



    useEffect(() => {

        const FetchMarketData = async () => {

            const MarketData = await GetMarketData()
            setCoinFetched(MarketData)
        }

        FetchMarketData()

    }, [])



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
        <SafeAreaView style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <View>
                <CustomHeader title='Top Movers ✅' onPress={() => navigation.goBack()} />

            </View>
            <View>

                <FlatList
                    data={coinFetched}
                    keyExtractor={(item) => item.id}
                    renderItem={CoinListRenderItem}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6}
                    maxToRenderPerBatch={2}
                    windowSize={3}

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