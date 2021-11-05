import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'
import React, { useState, useCallback } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import CoinList from '../../components/CoinList'
import { FONTS, SIZES } from '../../constants'
const Favorite = ({ appTheme, navigation }) => {

    const [value, setValue] = useState([])

    useFocusEffect(
        useCallback(() => {
            GetCoinFavorite()
        }, [])
    )
    const GetCoinFavorite = () => {
        AsyncStorage.getItem('FavoriteCoin')
            .then((coinGotten) => {
                if (coinGotten !== null) {
                    setValue(JSON.parse(coinGotten))
                }
            }).catch(error => {
                alert('ERROR: ' + error)
            })
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


    const EmptyFavorite = () => {
        return (
            <View style={{ width: SIZES.width * 0.7, alignItems: 'center', justifyContent: 'center', top: SIZES.height * 0.2 }}>
                <Image style={{ height: 98, width: 98 }} source={require('../../assets/images/Sleepy.png')} />
                <Text style={{ ...FONTS.h4, color: appTheme.textColor, marginVertical: 5 }}>It’s awfully quiet here..... </Text>
                <Text style={{ ...FONTS.body4, textAlign: 'center', color: appTheme.textColor3 }}>Explore coins and add to favorite to show here.</Text>
            </View>

        )
    }

    UniqueFavCoins = value.reduce((acc, cur) => [
        ...acc.filter((obj) => obj.id !== cur.id), cur
    ], [])


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

            <View style={[styles.headerContainer, { backgroundColor: appTheme.backgroundColor2 }]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: appTheme.textColor }]}>Favorite 🌟</Text>
                </View>
            </View>


            {value.length < 1 && EmptyFavorite()}
            <FlatList
                data={UniqueFavCoins}
                keyExtractor={(_, index) => index.toString()}
                renderItem={CoinListRenderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={6}
                maxToRenderPerBatch={2}
                windowSize={3}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: SIZES.width,

    },
    headerContainer: {
        height: 55,
        width: SIZES.width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: SIZES.width * 0.775,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        ...FONTS.h2,
        marginHorizontal: 5,
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);