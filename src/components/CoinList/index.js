import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { connect } from 'react-redux'
import { COLORS, FONTS, icons, SIZES } from '../../constants'

const CoinList = ({ appTheme, priceChangePercentage24h, logoUrl, name, symbol, currentPrice, chartData, onPress }) => {



    const priceChangeColorForChart = priceChangePercentage24h > 0 ? COLORS.primary : COLORS.primary;
    const priceChangeColor = priceChangePercentage24h > 0 ? '#34C759' : '#EB0000';



    return (
        <TouchableOpacity activeOpacity={0.5} style={[styles.container, { backgroundColor: appTheme.backgroundColor }]} onPress={onPress}>



            {/* CoinName Logo Symbol */}
            <View style={styles.nameLogoSymbol}>
                <Image source={{ uri: logoUrl }} style={{ width: 24, height: 24, borderRadius: 30, marginRight: 5 }} resizeMode='contain' />
                <View style={styles.nameSymbolContainer}>
                    <Text style={[styles.name, { color: appTheme.textColor }]}>{name}</Text>
                    <Text style={[styles.symbol, { color: appTheme.textColor3 }]}>{symbol}</Text>
                </View>
            </View>



            {/* Coin Chart */}

            <View>
                <LineChart
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withDots={false}
                    withInnerLines={false}
                    withVerticalLines={false}
                    withOuterLines={false}
                    data={{
                        datasets: [{ data: chartData }]
                    }}
                    width={80}
                    height={73}
                    chartConfig={{
                        color: () => priceChangeColorForChart,
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: appTheme.backgroundColor,
                        backgroundGradientTo: appTheme.backgroundColor,
                        strokeWidth: 1,
                        fillShadowGradient: COLORS.primary,
                        fillShadowGradientOpacity: 0.2

                    }}
                    bezier
                    style={{
                        paddingRight: 0,

                    }}
                />
            </View>

            {/* Price and percentage price change */}

            <View style={styles.pricePercContainer}>


                <Text style={[styles.currentPrice, { color: appTheme.textColor }]}>{currentPrice?.toLocaleString('en-US')}</Text>

                <View style={styles.coinPercentage}>
                    {priceChangePercentage24h != 0 && <Image source={icons.arrowUp}
                        style={{ width: 13, height: 13, tintColor: priceChangeColor, transform: priceChangePercentage24h > 0 ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }} />}

                    <Text style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage24h?.toLocaleString('en-US')}%</Text>
                </View>


            </View>


        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    container: {
        width: SIZES.width * 0.9,
        height: 75,
        padding: 5,
        marginVertical: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    priceChange: {
        fontSize: SIZES.font5,

    },
    coinPercentage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    nameLogoSymbol: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'red',
        height: 65,
        width: SIZES.width * 0.3
    },
    nameSymbolContainer: {
        marginLeft: 5

    },
    name: {
        ...SIZES.font4
    },
    symbol: {
        ...FONTS.body6,
        top: 5

    },
    pricePercContainer: {
        // backgroundColor: 'green'
    },
    currentPrice: {
        ...FONTS.h2,
        textAlign: 'right'
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

export default connect(mapStateToProps, mapDispatchToProps)(CoinList);