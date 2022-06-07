import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: SIZES.font1 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    width: SIZES.font1 * 2.5,
    height: SIZES.font1 * 2.5,
    top: 5,
  },
  topMoversContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width * 0.9,
    paddingVertical: SIZES.font10,
    // height: 63,
  },
  topMoversContainer2: {
    justifyContent: 'space-between',
    height: SIZES.font1,
  },
  topMovers: {
    ...FONTS.h6,
  },
  last24: {
    ...FONTS.h8,
    fontWeight: '100',
  },
  seeAll: {
    ...FONTS.h7,
  },
  coinCard: {
    height: SIZES.height * 0.18,
    paddingLeft: SIZES.width * 0.05,

    // marginBottom: -15,
    // marginLeft: 25,
  },
  marketTrendsContainer: {
    width: SIZES.width * 0.9,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketTrends: {
    ...FONTS.h6,
  },
  listTab: {
    flexDirection: 'row',
    width: SIZES.width * 0.9,
    marginBottom: 10,
  },
  btnTab: {
    width: SIZES.font1 * 2.8,
    height: SIZES.height * 0.05,
    marginRight: 10,
    marginVertical: 5,
    borderWidth: 0.25,
    alignItems: 'center',
    borderColor: COLORS.grey,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textTab: {
    ...FONTS.body10,
    marginHorizontal: 10,
    color: COLORS.grey,
    letterSpacing: 1,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textTabActive: {
    color: 'white',
  },
  listSeeAllContainer: {
    justifyContent: 'center',
    top: 5,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 110 : 130,
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    flexDirection: 'row',
  },
  listSeeAll: {
    ...FONTS.body8,
    // fontWeight: "bold",
  },
  refreshButton: {
    width: SIZES.width * 0.34,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius3,
    marginVertical: 40,
  },
  refresh: {
    color: COLORS.white,
    ...FONTS.h5,
  },
  networkErrorContainer: {
    width: SIZES.width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    top: SIZES.height * 0.2,
  },
  networkErrorText: {
    ...FONTS.h4,
    marginVertical: 5,
  },
  networkErrorDesc: {
    ...FONTS.body4,
    textAlign: 'center',
  },
  homePageLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(107,85,208,0.16)',
    // zIndex:100
  },
  modalView: {
    width: SIZES.width * 0.9,
    height: SIZES.width * 0.9,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    // fontWeight: "bold",
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
