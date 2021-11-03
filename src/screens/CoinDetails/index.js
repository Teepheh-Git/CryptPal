import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
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

const CoinDetails = ({ appTheme, appCurrency, route, coins, navigation }) => {
    const dataFromHome = route.params


    const [favAdded, setFavAdded] = useState(false)
    const [textUnit, setTextUnit] = useState('0')
    const [fiatValue, setFiatValue] = useState('0.00')
    const [tokenValue, setTokenValue] = useState('0.00')
    const [swap, setSwap] = useState(true)



    useEffect(() => {
        getCoinMarket()
        const amount = parseFloat(textUnit)

        if (!amount && amount !== 0) {
            setTextUnit('')
            setFiatValue('')
            return
        }

        setFiatValue((amount * dataFromHome?.current_price))


    }, [textUnit])



    useEffect(() => {
        getCoinMarket()
        const amount = parseFloat(textUnit)

        if (!amount && amount !== 0) {
            setTextUnit('')
            setTokenValue('')
            return
        }

        setTokenValue((amount / dataFromHome?.current_price))


    }, [textUnit])








    const SaveToFavorites = () => {
        AsyncStorage.getItem('FavoriteCoin')
            .then(fav => {
                favCoin = fav == null ? [] : JSON.parse(fav)
                favCoin.push(dataFromHome);
                setFavAdded(true)
                return AsyncStorage.setItem('FavoriteCoin', JSON.stringify(favCoin))
            })
    }


    useEffect(() => {
        AsyncStorage.getItem('FavoriteCoin')
            .then(fav => {
                savedCoins = fav == null ? [] : JSON.parse(fav)
                function findSaved(savedCoins) {
                    return savedCoins.id === dataFromHome.id
                }
                const CoinStoredCheck = savedCoins.find(findSaved)
                if (CoinStoredCheck !== undefined) {
                    setFavAdded(true)
                }
                return savedCoins
            })

    }, [])




    function toggleSwapButton() {

        if (swap) {
            setSwap(false)
        } else {
            setSwap(true)
        }



    }



    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]} >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <CustomHeader title='Overview' image={icons.overviewGraph} onPress={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

                        <CoinDetailsTitle
                            name={dataFromHome?.name}
                            logoUrl={dataFromHome?.image}
                            symbol={dataFromHome?.symbol.toUpperCase()}
                            currentPrice={dataFromHome?.current_price}
                            priceChangePercentage24h={dataFromHome?.price_change_percentage_24h}
                        />


                        <View>
                            <Chart
                                chartPrices={
                                    dataFromHome?.sparkline_in_7d?.price
                                }
                                containerStyle={{
                                    marginTop: SIZES.padding,
                                    marginHorizontal: 15,
                                    flexDirection: "row",
                                }} />


                        </View>



                        <Text style={{ color: appTheme.textColor2, alignSelf: 'flex-end', margin: 15 }}>Updated: {moment(dataFromHome.last_updated).fromNow()}</Text>


                        <View style={[styles.coinDetailsContainer, { backgroundColor: appTheme.backgroundColor3 }]}>

                            <Text style={[styles.coinDetails, { color: appTheme.textColor }]}>Coin Details</Text>

                            <CoinDetailsInfo title={'MARKET CAP'} value={appCurrency.symbol + ' ' + dataFromHome?.market_cap?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'TRADING VOLUME'} value={appCurrency.symbol + ' ' + dataFromHome?.total_volume?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'24HR HIGH'} value={appCurrency.symbol + ' ' + dataFromHome?.high_24h?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'24HR LOW'} value={appCurrency.symbol + ' ' + dataFromHome?.low_24h?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'ALL TIME HIGH'} value={appCurrency.symbol + ' ' + dataFromHome?.ath?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'ALL TIME HIGH DATE'} value={moment(dataFromHome?.ath_date)?.format('DD/MM/YYYY')} />
                            <CoinDetailsInfo title={'ALL TIME LOW'} value={appCurrency.symbol + ' ' + dataFromHome?.atl?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'ALL TIME LOW DATE'} value={moment(dataFromHome?.atl_date)?.format('DD/MM/YYYY')} />
                            <CoinDetailsInfo title={'CIRCULATING SUPPLY'} value={appCurrency.symbol + ' ' + dataFromHome?.circulating_supply?.toLocaleString("en-US")} />
                            <CoinDetailsInfo title={'TOTAL SUPPLY'} value={appCurrency.symbol + ' ' + dataFromHome?.total_supply?.toLocaleString("en-US")} />
                        </View>



                        <View style={styles.converterContainer}>
                            <Text style={[styles.convertCoin, { color: appTheme.textColor }]}>Convert Coin</Text>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 15 }}>
                                <View style={{ width: SIZES.width * 0.35, height: SIZES.height * 0.07, borderWidth: 1, flexDirection: 'row', borderColor: appTheme.textColor3, borderRadius: 10, justifyContent: 'space-evenly', alignItems: 'center' }}>

                                    <Image style={{ width: 30, height: 30 }} source={swap ? { uri: dataFromHome.image } : appCurrency.image} />


                                    <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>{swap ? dataFromHome.symbol.toUpperCase() : appCurrency.ticker}</Text>

                                </View>

                                <TouchableOpacity onPress={toggleSwapButton}
                                    style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 44, backgroundColor: appTheme.backgroundColor4 }}>
                                    <Image source={icons.swapIcon} style={{ width: 22, height: 22, }} />


                                </TouchableOpacity>

                                <View style={{ width: SIZES.width * 0.35, height: SIZES.height * 0.07, borderWidth: 1, flexDirection: 'row', borderColor: appTheme.textColor3, borderRadius: 10, justifyContent: 'space-evenly', alignItems: 'center' }}>

                                    <Image style={{ width: 30, height: 30 }} source={swap ? appCurrency.image : { uri: dataFromHome.image }} />
                                    <Text style={{ color: appTheme.textColor, ...FONTS.body3 }}>{swap ? appCurrency.ticker : dataFromHome.symbol.toUpperCase()}</Text>

                                </View>
                            </View>


                            <View style={{ backgroundColor: appTheme.backgroundColor4, height: SIZES.height * 0.13, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                                <Text style={{ color: appTheme.textColor, ...FONTS.h1 }}>{swap ? appCurrency.symbol + ' ' + fiatValue?.toLocaleString("en-US") : tokenValue?.toLocaleString("en-US")}</Text>
                                <Text style={{ color: appTheme.textColor, ...FONTS.body4 }}>{swap ? appCurrency.ticker : dataFromHome.symbol.toUpperCase()}</Text>
                            </View>

                            <Text style={{ color: appTheme.textColor, ...FONTS.body4, marginVertical: 10 }}>Enter Unit</Text>


                            <TextInput
                                placeholder="Enter preferred unit"
                                placeholderTextColor={appTheme.textColor3}
                                multiline={false}
                                value={textUnit}
                                onChangeText={setTextUnit}
                                keyboardType={'decimal-pad'}
                                style={{ color: appTheme.textColor, borderWidth: 0.5, height: SIZES.height * 0.06, borderRadius: 8, borderColor: COLORS.grey, paddingHorizontal: 10 }}



                            />

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


            </KeyboardAvoidingView>
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
    converterContainer: {
        width: SIZES.width * 0.9,
        // alignItems: 'flex-start',

        marginVertical: 30

    },
    convertCoin: {
        alignSelf: 'flex-start',
        ...FONTS.h3
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

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetails);