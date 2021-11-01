import React from 'react';
import { Text, View } from "react-native";
import moment from "moment";
import {
    ChartDot,
    ChartPath,
    ChartPathProvider,
    ChartXLabel,
    ChartYLabel,
    monotoneCubicInterpolation
} from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from "../../constants";
import { connect } from 'react-redux';


const Chart = ({ containerStyle, chartPrices, appTheme }) => {

    let startUnixTimeStamp = moment().subtract(7, 'day').unix()
    let data = chartPrices ? chartPrices?.map((item, index) => {
        return {
            x: startUnixTimeStamp + (index + 1) * 3600,
            y: item
        }
    }) : []

    let points = monotoneCubicInterpolation({ data, range: 40 })

    const formatUSD = value => {
        'worklet';
        if (value === '') {
            return ''
        }
        return `$${Number(value).toLocaleString("en-US")}`
    }
    const formatDateTime = (value) => {
        'worklet';
        if (value === '') {
            return ''
        }

        const selectedDate = new Date(value * 1000);

        const date = `0${selectedDate.getDate()}`.slice(-2);
        const month = `0${selectedDate.getMonth()}`.slice(-2);
        const year = `0${selectedDate.getYear()}`.slice(-2);


        return `${date}-${month}-${year}`
    };


    const formatNumber = (value, roundingPoint) => {

        if (value > 1e9) {
            return `${(value / 1e9).toFixed(roundingPoint)}B`
        } else if (value > 1e6) {
            return `${(value / 1e6).toFixed(roundingPoint)}M`
        } else if (value > 1e3) {
            return `${(value / 1e3).toFixed(roundingPoint)}K`
        } else {
            return value.toFixed(roundingPoint)

        }


    }


    const getYAxisLabelValues = () => {

        if (chartPrices !== undefined) {
            const minValue = Math.min(...chartPrices)
            const maxValue = Math.max(...chartPrices)

            const midValue = (maxValue + minValue) / 2

            const higherMidValue = (maxValue + midValue) / 2
            const lowerMidValue = (minValue + midValue) / 2


            let roundingPoint = 2

            return [
                formatNumber(maxValue, roundingPoint),
                formatNumber(higherMidValue, roundingPoint),
                formatNumber(lowerMidValue, roundingPoint),
                formatNumber(midValue, roundingPoint)
            ]

        } else {
            return []
        }
    }


    return (
        <View style={{ ...containerStyle }}>


            {/*Y axis label*/}


            <View style={{
                // position: 'absolute',
                // left: SIZES.padding,
                // top: 0,
                // backgroundColor: 'cyan',
                // bottom: 0,
                justifyContent: 'space-between',
            }}>

                {/*get Y axis label values*/}

                {getYAxisLabelValues().map((item, index) => {
                    return (
                        <Text
                            key={index}
                            style={{
                                color: appTheme.textColor3,
                                ...FONTS.body5
                            }}
                        >${item}</Text>
                    )
                })}


            </View>


            {/*Chart*/}
            {data.length > 0 &&
                <ChartPathProvider
                    data={{
                        points: points,
                        smoothingStrategy: 'bezier'
                    }}
                >
                    <ChartPath
                        height={150}
                        width={SIZES.width * 0.85}
                        stroke={COLORS.primary}
                        strokeWidth={4}
                        selectedStrokeWidth={4}
                        selectedOpacity={1}

                    />


                    <ChartDot>
                        <View style={{
                            position: 'absolute',
                            left: -10,
                            width: 80,
                            justifyContent: 'center',
                            height: SIZES.width * 0.15,
                            bottom: 25,
                            borderRadius: 15,
                            alignItems: 'center',
                            backgroundColor: appTheme.backgroundColor,
                            elevation: 1,
                            shadowOpacity: 0.1,
                            shadowOffset: {
                                width: 2,
                                height: 2,
                            },
                            zIndex: 1
                        }}>




                            {/*Y-label*/}
                            <ChartYLabel

                                format={formatUSD}
                                style={{
                                    color: appTheme.textColor,
                                    ...FONTS.h3,
                                    // backgroundColor: 'red',
                                    padding: 5,
                                    // bottom: 5


                                }} />


                            {/*X-label*/}

                            <ChartXLabel
                                format={formatDateTime}
                                style={{
                                    marginTop: 3,
                                    color: appTheme.textColor3,
                                    ...FONTS.body6,
                                    lineHeight: 15
                                }}
                            />

                            {/*Dot*/}
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 25,
                                height: 25,
                                top: 25,
                                borderRadius: 15,
                                backgroundColor: COLORS.white,
                                shadowOpacity: 0.1,
                                shadowOffset: {
                                    width: 2,
                                    height: 2,
                                }
                            }}>

                                <View style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: 10,
                                    backgroundColor: COLORS.primary
                                }} />
                            </View>





                        </View>


                    </ChartDot>
                </ChartPathProvider>
            }

        </View>
    );
};



export function mapStateToProps(state) {
    return {
        appTheme: state.themeReducer.appTheme,
        error: state.themeReducer.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);