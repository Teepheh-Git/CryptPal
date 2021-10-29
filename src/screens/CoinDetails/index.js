import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import CoinDetailsTitle from '../../components/CoinDetailsTitle'
import CoinList from '../../components/CoinList'
import CustomHeader from '../../components/CustomHeader'
import { COLORS, FONTS, icons, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from '../../components/Chart'
import { getCoinMarket } from '../../stores/market/marketActions'
import CoinDetailsInfo from '../../components/CoinDetailsInfo'
import moment from 'moment'
import CustomButton from '../../components/CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'

const CoinDetails = ({ appTheme, route, coins, navigation }) => {
    const dataFromHome = route.params

    const [favCoinSaved, setFavCoinSaved] = useState(dataFromHome)

    const [favAdded, setFavAdded] = useState(false)

    useFocusEffect(
        useCallback(() => {

            getCoinMarket()

        }, [])
    )


    useEffect(() => {




        favCoin.filter(x => {
            const xValue = x.id

            if (xValue === favCoinSaved.id) {
                setFavAdded(true)
            }
            return xValue
        })
    }, [])






    const SaveToFavorites = () => {
        AsyncStorage.getItem('FavoriteCoin')
            .then(fav => {
                favCoin = fav == null ? [] : JSON.parse(fav)
                favCoin.push(favCoinSaved);
                // alert('successfully saved')

                // if (favCoin.filter(x => x.id === favCoinSaved.id)) {
                // console.log(x.id)
                setFavAdded(true)
                // }
                // setFavAdded(true)
                return AsyncStorage.setItem('FavoriteCoin', JSON.stringify(favCoin))
            })
    }




    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <CustomHeader title='Overview' image={icons.overviewGraph} onPress={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

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
                        <CoinDetailsInfo title={'CIRCULATING SUPPLY'} value={'$ ' + dataFromHome?.circulating_supply?.toLocaleString("en-US")} />
                        {/* <CoinDetailsInfo title={'TOTAL SUPPLY'} value={'$ ' + dataFromHome.total_supply.toLocaleString("en-US")} /> */}

                    </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={SaveToFavorites}>



                        {favAdded ? <LinearGradient style={[styles.root2, { borderColor: appTheme.textColor2 }]} colors={[appTheme.backgroundColor2, appTheme.backgroundColor2]}>
                            <Image style={{ width: 18, height: 18, tintColor: appTheme.textColor2, marginHorizontal: 10 }} source={icons.FavCheck} />
                            <Text style={[styles.text, { color: appTheme.textColor2 }]}>Added to Favorite</Text>
                        </LinearGradient> :
                            <LinearGradient style={styles.root} colors={['#826FD7', '#4F36C4']}>
                                <Text style={styles.text}>Add to Favorite</Text>
                            </LinearGradient>

                        }
                    </TouchableOpacity>

                </View>

            </ScrollView>


        </SafeAreaView>


    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        width: SIZES.width,
        alignItems: 'center',
        alignSelf: 'center'

        // height: SIZES.height
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

    },
    root: {

        width: SIZES.width * 0.7,
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius2,
        marginVertical: 50,

    },
    root2: {
        width: SIZES.width * 0.7,
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: SIZES.radius2,
        marginVertical: 50,
        flexDirection: 'row'

    },
    text: {
        color: COLORS.white,
        ...FONTS.h5,
    },

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