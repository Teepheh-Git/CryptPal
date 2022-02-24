import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FONTS } from "../../constants";

const CoinDetailsInfo = ({ appTheme, title, value }) => {
  return (
    <View style={styles.detailsText}>
      <Text style={[styles.title, { color: appTheme.textColor3 }]}>{title}</Text>
      <Text style={{...FONTS.h4, color: appTheme.textColor }}>{value}</Text>
    </View>
  );
};


const styles = StyleSheet.create({

  detailsText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    ...FONTS.h3

  },
  title: {
    ...FONTS.body3,

  },
});


export function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.themeReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetailsInfo);
