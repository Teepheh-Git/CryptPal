import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    width: SIZES.width,
  },
  listTab: {
    height: SIZES.height * 0.09,
    flexDirection: 'row',
    width: SIZES.width * 0.9,
  },
  btnTab: {
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
    ...FONTS.body8,
    marginHorizontal: 10,
    color: COLORS.grey,
    letterSpacing: 1,
    // width:SIZES.font1*3,
  },
  btnTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textTabActive: {
    color: 'white',
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
  pageLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
