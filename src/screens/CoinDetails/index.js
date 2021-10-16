import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import CoinDetailsTitle from '../../components/CoinDetailsTitle'
import CoinList from '../../components/CoinList'
import CustomHeader from '../../components/CustomHeader'
import { FONTS, icons, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from '../../components/Chart'
import { getCoinMarket } from '../../stores/market/marketActions'
import CoinDetailsInfo from '../../components/CoinDetailsInfo'
import moment from 'moment'


const CoinDetails = ({ appTheme, route, coins }) => {




    useEffect(() => {

        getCoinMarket()

    }, [])


    navigation = useNavigation()

    const dataFromHome = route.params



    // console.log(dataFromHome?.sparkline_in_7d?.price)
    // console.log(coins[0]?.sparkline_in_7d?.price)


    return (
        <ScrollView>
            <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>



                <CustomHeader title='Overview' image={icons.overviewGraph} onPress={() => navigation.goBack()} />

                <CoinDetailsTitle
                    name={dataFromHome.name}
                    logoUrl={dataFromHome.image}
                    symbol={dataFromHome.symbol.toUpperCase()}
                    currentPrice={dataFromHome.current_price}
                    priceChangePercentage24h={dataFromHome?.price_change_percentage_24h}
                />


                <View>



                    <Chart
                        chartPrices={
                            // coins[0]?.sparkline_in_7d?.price
                            dataFromHome?.sparkline_in_7d?.price
                            // selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price
                        }
                        containerStyle={{
                            marginTop: SIZES.padding,
                            marginHorizontal: 15,
                            // alignItems: 'center',
                            flexDirection: "row",
                            // backgroundColor: 'red'
                        }} />


                </View>



                <Text style={{ color: appTheme.textColor2, alignSelf: 'flex-end', margin: 15 }}>Updated: {moment(dataFromHome.last_updated).fromNow()}</Text>


                <View style={[styles.coinDetailsContainer, { backgroundColor: appTheme.backgroundColor3 }]}>

                    <Text style={[styles.coinDetails, { color: appTheme.textColor }]}>Coin Details</Text>

                    <CoinDetailsInfo title={'MARKET CAP'} value={'$ ' + dataFromHome.market_cap.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'TRADING VOLUME'} value={'$ ' + dataFromHome.total_volume.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'24HR HIGH'} value={'$ ' + dataFromHome.high_24h.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'24HR LOW'} value={'$ ' + dataFromHome.low_24h.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'ALL TIME HIGH'} value={'$ ' + dataFromHome.ath.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'ALL TIME HIGH DATE'} value={moment(dataFromHome.ath_date).format('DD/MM/YYYY')} />
                    <CoinDetailsInfo title={'ALL TIME LOW'} value={'$ ' + dataFromHome.atl.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'ALL TIME LOW DATE'} value={moment(dataFromHome.atl_date).format('DD/MM/YYYY')} />
                    <CoinDetailsInfo title={'CIRCULATING SUPPLY'} value={'$ ' + dataFromHome.circulating_supply.toLocaleString("en-US")} />
                    <CoinDetailsInfo title={'TOTAL SUPPLY'} value={'$ ' + dataFromHome.total_supply.toLocaleString("en-US")} />




                </View>

            </SafeAreaView>


        </ScrollView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        height: SIZES.height
        // justifyContent: 'center',
    },

    coinDetailsContainer: {
        width: SIZES.width * 0.9,
        padding: 10,
        borderRadius: 8,
        marginVertical: 10
    },
    coinDetails: {
        marginVertical: 5,
        ...FONTS.body2,
        fontWeight: 'bold'

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

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);