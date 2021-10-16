import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { COLORS, icons, SIZES } from '../../constants'



const CoinCard = ({ appTheme, name, currentPrice, priceChangePercentage24h, logoUrl }) => {


    const priceChangeColor = priceChangePercentage24h > 0 ? '#34C759' : '#EB0000';

    return (
        <View style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
            <Image source={{ uri: logoUrl }} style={{ width: 24, height: 24, bottom: 5, borderRadius: 15 }} resizeMode='contain' />
            <Text style={[styles.coinName, { color: appTheme.textColor3 }]}>{name}/USD</Text>
            <Text style={[styles.coinPrice, { color: appTheme.textColor }]}>${currentPrice.toLocaleString('en-US')}</Text>
            <View style={styles.coinPercentage}>
                {priceChangePercentage24h != 0 && <Image source={icons.arrowUp}
                    style={{ width: 13, height: 13, tintColor: priceChangeColor, transform: priceChangePercentage24h > 0 ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }} />}

                <Text style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h.toLocaleString('en-US')}%</Text>
            </View>

        </View >

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