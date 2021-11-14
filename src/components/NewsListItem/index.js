import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, SIZES } from "../../constants";


const NewsListItem = ({ appTheme, title, time, link, onPress }) => {
  return (
    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor2 }]}>

      <Text numberOfLines={1} ellipsizeMode={"tail"}
            style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>
      <View style={styles.timeLinkContainer}>
        <Text style={[styles.time, { color: appTheme.textColor3 }]}>{time}</Text>

        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.readMore, { color: appTheme.textColor2 }]}>{link}</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width * 0.9,
    height: 75,
    justifyContent: "space-around",
    paddingVertical: 10,

  },
  title: {
    ...FONTS.body2,
  },

  timeLinkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    ...FONTS.body5,
  },
  readMore: {
    ...FONTS.h4,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsListItem);
