import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import CustomHeader from '../../components/CustomHeader'
import { COLORS, FONTS, SIZES } from '../../constants'
import { SAMPLE_DATA } from '../../assets/data/sampleData'
import CoinList from '../../components/CoinList'
import constants from '../../constants/constants'
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import axios from 'axios'
import LottieView from 'lottie-react-native';




const MarketTrends = ({ appTheme, appCurrency, navigation }) => {





    // const [currentPage, setCurrentPage] = useState(1)
    const [marketPageLoading, setMarketPageLoading] = useState(true)
    // const [coinFetched, setCoinFetched] = useState([])
    const [coinListFetched, setCoinListFetched] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('Popular')
    const [orderBy, setOrderBy] = useState('market_cap_desc')

    const [category, setCategory] = useState('smart-contract-platform')


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


    if (coinListFetched?.length > 0) {
        setTimeout(() => {
            setMarketPageLoading(false)
        }, 200)
    }



    useEffect(() => {
        const FetchListMarketData = async () => {
            const ListMarketData = await GetListMarketData()
            setCoinListFetched(ListMarketData)
        }
        FetchListMarketData();

    }, [orderBy, category])





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
        if (status === 'Volume') {
            setOrderBy('volume_desc')
        }
        if (status === 'Name') {
            setOrderBy('id_asc')


        }

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

        marketPageLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor }}>
            {appTheme.name === 'light' ? <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/pupr.mp4.lottie.json')} autoPlay loop /> : <LottieView style={{ width: 80, height: 80 }} source={require('../../assets/images/black.mp4.lottie.json')} autoPlay loop />}


        </View> :
            <SafeAreaView style={[styles.Container, { backgroundColor: appTheme.backgroundColor2 }]}>
                <CustomHeader title='Market Trends 💰' onPress={() => navigation.goBack()} />



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


                <FlatList
                    data={coinListFetched}
                    keyExtractor={(item) => item.id}
                    renderItem={CoinListRenderItem}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={10}
                    maxToRenderPerBatch={2}
                    // windowSize={3}
                    ListFooterComponent={
                        <View style={{ marginBottom: 50 }} />
                    }

                />




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