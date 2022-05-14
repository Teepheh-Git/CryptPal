import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FONTS } from "../../constants";

const CoinDetailsInfo = ({ title, value }) => {

  const { appTheme } = useSelector(state => state.themeReducer);

  return (
    <View style={styles.detailsText}>
      <Text style={[styles.title, { color: appTheme.textColor3 }]}>{title}</Text>
      <Text style={{ ...FONTS.h9, color: appTheme.textColor }}>{value}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  detailsText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    ...FONTS.h9,
  },
  title: {
    ...FONTS.body9,
  },
});


export default CoinDetailsInfo;
