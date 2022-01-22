import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,
  },
  listTab: {
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // width: SIZES.width * 0.9,
    // alignItems: "center",
    height: SIZES.height * 0.09,

    flexDirection: "row",
    // justifyContent: "flex-start",
    width: SIZES.width * 0.9,
    // alignItems: "flex-end",
    // backgroundColor:'red',
    // marginBottom: 10,
    // elevation: 0.3,
    // shadowOpacity: 0.1,
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },

  },
  btnTab: {
    // height: 40,
    // marginHorizontal: 5,
    // marginVertical: 5,
    // borderWidth: 0.25,
    // alignItems: "center",
    // borderColor: COLORS.grey,
    // borderRadius: 5,
    // justifyContent: "center",

    height: SIZES.height * 0.05,
    // marginHorizontal: 5,
    marginRight:10,
    marginVertical: 5,
    borderWidth: 0.25,
    alignItems: "center",
    borderColor: COLORS.grey,
    borderRadius: 5,
    justifyContent: "center",


  },
  textTab: {
    // ...FONTS.body5,
    // marginHorizontal: 5,
    // color: COLORS.grey,

    ...FONTS.body4,
    marginHorizontal: 10,
    color: COLORS.grey,
    letterSpacing: 1,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textTabActive: {
    color: "white",
  },
  refreshButton: {
    width: SIZES.width * 0.34,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius3,
    marginVertical: 40,
  },
  refresh: {
    color: COLORS.white,
    ...FONTS.h5,
  },
  networkErrorContainer: {
    width: SIZES.width * 0.7,
    alignItems: "center",
    justifyContent: "center",
    top: SIZES.height * 0.2,
  },
  networkErrorText: {
    ...FONTS.h4,
    marginVertical: 5,
  },
  networkErrorDesc: {
    ...FONTS.body4,
    textAlign: "center",
  },

});
export default styles;
