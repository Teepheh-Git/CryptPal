import { Platform, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 3,
    },
  },
  imgHeader: {
    width: 85.84,
    height: 74,
    top: 5,
  },
  topMoversContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width * 0.9,
    height: 63,
  },
  topMoversContainer2: {
    justifyContent: "space-between",
    height: 43,
  },
  topMovers: {
    fontSize: SIZES.font2,
    fontWeight: "bold",
    // lineHeight: 24,
  },
  last24: {
    fontSize: SIZES.font4,
    fontWeight: "100",
  },
  seeAll: {
    fontSize: SIZES.font3,
    fontWeight: "bold",

  },
  coinCard: {
    height: 150,
    marginBottom: 35,
    marginLeft: 25,
  },
  marketTrendsContainer: {
    width: SIZES.width * 0.9,
    marginVertical: 5,
    flexDirection:"row",
    alignItems: "center",
  },
  marketTrends: {
    fontSize: SIZES.font2,
    fontWeight: "bold",
    // lineHeight: 24,
  },
  listTab: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    width: SIZES.width * 0.9,
    // alignItems: "flex-end",
    // backgroundColor:'red',
    marginBottom: 10,
    elevation: 0.3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 5,
      height: 3,
    },
  },
  btnTab: {
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
    ...FONTS.body4,
    marginHorizontal: 15,
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
  listSeeAllContainer: {
    justifyContent: "center",
    top: 5,
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 110 : 130,
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
  },
  listSeeAll: {
    ...FONTS.body3,
    fontWeight: "bold",

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
  homePageLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },


});


export default styles;
