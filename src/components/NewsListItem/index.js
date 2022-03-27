import React from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { FONTS, icons, SIZES } from "../../constants";


const NewsListItem = ({ appTheme, title, time, link, onPress, image, source }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
      <Image style={[styles.img, { backgroundColor: appTheme.backgroundColor2 }]} resizeMode={"cover"}
             source={image !== null ? { uri: image } : icons.imgPlacehholder} />
      {/*<Image style={styles.img} resizeMode={"cover"} source={icons.imgPlacehholder} />*/}

      <View style={styles.titleBox}>

        <Text numberOfLines={2} ellipsizeMode={"tail"}
              style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>


        <View style={styles.timeLinkContainer}>
          <Text numberOfLines={1} ellipsizeMode={"head"} style={[styles.time, { color: appTheme.textColor3 }]}> <Text
            style={[styles.time, { color: appTheme.textColor3 }]}>{source} - </Text>{time}</Text>

          {/*<TouchableOpacity style={{width:50}} onPress={onPress}>*/}
            <Text style={[styles.readMore, { color: appTheme.textColor2 }]}>{link}</Text>
          {/*</TouchableOpacity>*/}

        </View>


      </View>


    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width * 0.9,
    height: SIZES.width * 0.25,
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal:5,
    flexDirection: "row",
    marginVertical: 2,

  },
  img: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
    borderRadius: 10,


  },
  titleBox: {
    width: SIZES.width * 0.63,
    // backgroundColor:"cyan",
    height: SIZES.width * 0.2,
    justifyContent: "space-between",
    padding: 5,


  },
  title: {
    ...FONTS.h8,
    width: SIZES.width * 0.55,

  },

  timeLinkContainer: {
    width: SIZES.width * 0.6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"yellow",

  },
  time: {
    ...FONTS.h9,
    width: SIZES.width * 0.4,
  },
  readMore: {
    ...FONTS.h9,
    // alignSelf: "flex-end",
    textAlign:"right"
    // width: SIZES.width * 0.2,

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
