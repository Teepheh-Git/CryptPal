import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { COLORS, icons, SIZES } from '../../constants'



const CoinCard = ({ appTheme, appCurrency, name, currentPrice, priceChangePercentage24h, logoUrl, onPress }) => {


    const priceChangeColor = priceChangePercentage24h > 0 ? '#34C759' : '#EB0000';

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
            <Image source={{ uri: logoUrl }} style={{ width: 24, height: 24, bottom: 5, borderRadius: 15 }} resizeMode='contain' />
            <Text style={[styles.coinName, { color: appTheme.textColor3 }]}>{name}/{appCurrency.ticker}</Text>
            <Text style={[styles.coinPrice, { color: appTheme.textColor }]}>{appCurrency.symbol + ''} {currentPrice.toLocaleString('en-US')}</Text>
            <View style={styles.coinPercentage}>
                {priceChangePercentage24h != 0 && <Image source={icons.arrowUp}
                    style={{ width: 13, height: 13, tintColor: priceChangeColor, transform: priceChangePercentage24h > 0 ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }} />}

                <Text style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h.toLocaleString('en-US')}%</Text>
            </View>

        </TouchableOpacity >

    )
}


const styles = StyleSheet.create({
    container: {
        width: 128,
        height: 120,
        borderRadius: 8,
        padding: 15,
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 10
    },
    coinName: {
        fontSize: SIZES.font5,
        fontWeight: 'normal',
        bottom: 5
    },
    coinPrice: {
        fontSize: SIZES.font2,
        fontWeight: 'bold',

    },
    priceChange: {
        fontSize: SIZES.font5

    },
    coinPercentage: {
        flexDirection: 'row',
        alignItems: 'center',
    }

})



export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
        appCurrency: state.currencyReducer.appCurrency,
        error: state.currencyReducer.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: themeType => {
            return dispatch(toggleTheme(themeType));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinCard);