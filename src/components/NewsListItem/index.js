import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";


const NewsListItem = ({ appTheme, title, time, link, onPress, image,source }) => {
  return (
    <View style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
      <Image style={styles.img} resizeMode={"cover"} source={image !==null ? { uri: image } : icons.imgPlacehholder} />
      {/*<Image style={styles.img} resizeMode={"cover"} source={icons.imgPlacehholder} />*/}

      <View style={styles.titleBox}>

        <Text numberOfLines={2} ellipsizeMode={"tail"}
              style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>


        <View style={styles.timeLinkContainer}>
          <Text numberOfLines={1} style={[styles.time, { color: appTheme.textColor3 }]}> <Text style={[styles.time, { color: appTheme.textColor3 }]}>{source} - </Text>{time}</Text>

          <TouchableOpacity onPress={onPress}>
            <Text style={[styles.readMore, { color: appTheme.textColor2 }]}>{link}</Text>
          </TouchableOpacity>

        </View>


      </View>


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width * 0.9,
    height: SIZES.width * 0.25,
    alignSelf:"center",
    justifyContent: "space-around",
    paddingVertical: 10,
    flexDirection: "row",
    marginVertical:2

  },
  img: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
    borderRadius: 10,


  },
  titleBox: {
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.2,
    justifyContent: "space-between",
    padding: 10,


  },
  title: {
    ...FONTS.body3,
    width: SIZES.width * 0.7,

  },

  timeLinkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    ...FONTS.body5,
    width:SIZES.width*0.5
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
