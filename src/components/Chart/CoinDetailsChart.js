import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import { monotoneCubicInterpolation } from "@rainbow-me/animated-charts";
import { COLORS, FONTS, SIZES } from "../../constants";
import { connect } from "react-redux";
import { LineChart } from "react-native-chart-kit";


const CoinDetailsChart = ({ containerStyle, chartPrices, appTheme }) => {

  let startUnixTimeStamp = moment().subtract(7, "day").unix();
  let data = chartPrices ? chartPrices?.map((item, index) => {
    return {
      x: startUnixTimeStamp + (index + 1) * 3600,
      y: item,
    };
  }) : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = value => {
    "worklet";
    if (value === "") {
      return "";
    }
    return `$${Number(value).toLocaleString("en-US")}`;
  };
  const formatDateTime = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }

    const selectedDate = new Date(value * 1000);

    const date = `0${selectedDate.getDate()}`.slice(-2);
    const month = `0${selectedDate.getMonth()}`.slice(-2);
    const year = `0${selectedDate.getYear()}`.slice(-2);


    return `${date}-${month}-${year}`;
  };


  const formatNumber = (value, roundingPoint) => {

    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);

    }


  };


  const getYAxisLabelValues = () => {

    if (chartPrices !== undefined) {
      const minValue = Math.min(...chartPrices);
      const maxValue = Math.max(...chartPrices);

      const midValue = (maxValue + minValue) / 2;

      const higherMidValue = (maxValue + midValue) / 2;
      const lowerMidValue = (minValue + midValue) / 2;


      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(midValue, roundingPoint),
      ];

    } else {
      return [];
    }
  };


  return (
    <View style={{ ...containerStyle }}>


      {/*Y axis label*/}


      <View style={{
        // position: 'absolute',
        left: SIZES.padding,
        // paddingLeft:5,
        // top: 0,
        zIndex:100,
        // backgroundColor: 'cyan',
        // bottom: 0,
        // alignItems:"center",
        justifyContent: "space-around",
      }}>

        {/*get Y axis label values*/}

        {getYAxisLabelValues().map((item, index) => {
          return (
            <Text
              key={index}
              style={{
                color: appTheme.textColor3,
                ...FONTS.body5,
              }}
            >${item}</Text>
          );
        })}


      </View>


      {/*Chart*/}
      {data.length > 0 &&
      <LineChart
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withDots={false}
        withInnerLines={false}
        withVerticalLines={true}
        withOuterLines={false}
        bezier
        data={{
          datasets: [{ data: chartPrices }],
        }}
        width={SIZES.width * 0.9}
        height={SIZES.height * 0.39}
        chartConfig={{
          color: () => COLORS.primary,
          // backgroundColor: "cyan",
          backgroundGradientFrom: appTheme.backgroundColor2,
          backgroundGradientTo: appTheme.backgroundColor2,
          strokeWidth: 2,
          fillShadowGradient: COLORS.primary,
          fillShadowGradientOpacity: 0.2,
        }}
        style={{
          paddingRight: 15,
          paddingLeft: 0,

          height:SIZES.height * 0.35,
          // backgroundColor:'green'

          // marginTop: SIZES.padding,
        }}
      />
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetailsChart);
