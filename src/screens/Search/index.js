import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TextInput, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CoinList from '../../components/CoinList'
import CustomHeader from '../../components/CustomHeader'
import { FONTS, icons, SIZES } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getCoinMarket, getSearchMarket, getSearchMarket2 } from '../../stores/market/marketActions'


const Search = ({ appTheme, navigation, getCoinMarket, coins, appCurrency, coinSearch, coinSearch2, getSearchMarket, getSearchMarket2 }) => {

    const [searchCoin, setSearchCoin] = useState('')
    const [masterData, setMasterData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    let combinedSearchResult = [...coins, ...coinSearch, ...coinSearch2]


    const SearchFilter = (text) => {
        if (text) {
            const newData = masterData?.filter((item) => {
                const itemData = item?.name ? item?.name.toUpperCase() : ' '.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearchCoin(text)
        } else {
            setFilteredData(combinedSearchResult)
            setSearchCoin(text)
        }
    }


    useEffect(() => {
        getCoinMarket(currency = appCurrency.ticker)

        getSearchMarket(currency = appCurrency.ticker)
        getSearchMarket2(currency = appCurrency.ticker)


        setFilteredData(combinedSearchResult)
        setMasterData(combinedSearchResult)
    }, [appCurrency])

    const FilteredDataCondition = () => {
        if (searchCoin == '') {
            return []
        } else {
            return filteredData
        }
    }


    CoinListRenderItem = ({ item }) =>
        <CoinList
            name={item?.name}
            logoUrl={item?.image}
            symbol={item?.symbol?.toUpperCase()}
            currentPrice={item?.current_price}
            priceChangePercentage24h={item?.price_change_percentage_24h}
            chartData={item?.sparkline_in_7d?.price}
            onPress={() => navigation.navigate('CoinDetails', { ...item })}
        />


    const TopResults = () => {
        if (searchCoin !== '' && FilteredDataCondition().length !== 0) {
            return (
                <View style={{ width: SIZES.width * 0.9, marginVertical: 30 }}>
                    <Text style={{ alignSelf: 'flex-start', color: appTheme.textColor3, ...FONTS.body4 }}>Top Results</Text>
                </View>
            )
        }
    }


    const AboutToSearch = () => {
        return (
            <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
                <Image style={{}} source={require('../../assets/images/Thinking.png')} />
                <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>What are you searching for?</Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center', color: appTheme.textColor3 }}>Sorry, you'll have to make a search to get any result here.</Text>
            </View>

        )
    }
    const Notfound = () => {
        return (
            <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', marginVertical: 30 }}>
                <Image style={{}} source={require('../../assets/images/Sad.png')} />
                <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>No result found</Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center', color: appTheme.textColor3 }}>Sorry, we couldn't find any result in our database</Text>
            </View>
        )
    }







    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
            <CustomHeader title='Search' image={icons.search} onPress={() => navigation.goBack()} />
            <View style={{ flexDirection: 'row', width: SIZES.width * 0.9, height: 55, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

                <TextInput
                    placeholder={"Search any crypto coin..."}
                    value={searchCoin}
                    onChangeText={(text) => SearchFilter(text)}
                    placeholderTextColor={appTheme.textColor3}
                    multiline={false}
                    style={{
                        width: SIZES.width * 0.9,
                        height: 55, backgroundColor: appTheme.backgroundColor,
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        left: 10,
                        paddingRight: 30,
                        color: appTheme.textColor
                    }} >
                </TextInput>
                <Image style={{ width: 17, height: 17, tintColor: appTheme.textColor3, right: 15 }} source={icons.searchBarIcon} />
            </View>


            {searchCoin == '' && AboutToSearch()}

            {searchCoin !== '' && TopResults()}
            <FlatList
                data={FilteredDataCondition()}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={1}
                windowSize={3}
                renderItem={CoinListRenderItem}
                ListHeaderComponent={
                    searchCoin !== '' && FilteredDataCondition().length === 0 && Notfound()
                }
            />
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: SIZES.height
    }
})

export function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins,
        coinSearch: state.marketReducer.coinSearch,
        coinSearch2: state.marketReducer.coinSearch2,
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
        appCurrency: state.currencyReducer.appCurrency,
        error: state.currencyReducer.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCoinMarket: (currency, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, orderBy, sparkline = true, priceChangePerc, perPage = 250, page))
        },
        getSearchMarket: (currency, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getSearchMarket(currency, orderBy, sparkline = true, priceChangePerc, perPage, page))
        },
        getSearchMarket2: (currency, orderBy, sparkline, priceChangePerc, perPage, page) => {
            return dispatch(getSearchMarket2(currency, orderBy, sparkline = true, priceChangePerc, perPage, page))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);