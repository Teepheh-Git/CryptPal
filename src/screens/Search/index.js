import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, TextInput, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CoinList from '../../components/CoinList'
import CustomHeader from '../../components/CustomHeader'
import { FONTS, icons, SIZES } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'


const getMarketData = async (currency = "usd", orderBy = "market_cap_desc", sparkline = true, page = 1, priceChangePerc = "24h", perPage = 25,) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
        const data = response.data;
        return data

    } catch (e) {
        console.log(e.message)
    }


}

const Search = ({ appTheme, navigation, e }) => {


    const [searchCoin, setSearchCoin] = useState('')
    const [masterData, setMasterData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)





    if (filteredData.length > 0) {
        setTimeout(() => {
            setSearchLoading(false)
        }, 200)
    }




    const SearchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ' '.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            setFilteredData(newData)
            setSearchCoin(text)

        } else {
            setFilteredData(masterData)
            setSearchCoin(text)
        }
    }



    useEffect(() => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData()
            setFilteredData(marketData)
            setMasterData(marketData)
        }

        fetchMarketData()

    }, [])

    const FilteredDataCondition = () => {
        if (searchCoin == '') {
            return []
        } else {
            return filteredData
        }
    }



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
        searchLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: appTheme.backgroundColor2 }}>
            <ActivityIndicator size="large" color={appTheme.textColor2} />
        </View>
            : <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>
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
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);