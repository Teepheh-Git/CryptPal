import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const fontFamily = 'PublicaSansRound-Rg';

export const COLORS = {
  // primary colors
  primary: '#6B55D0',
  primary2: '#B1BBCD',
  black: '#0e0c0c',
  black2: '#121212',
  white: '#FFF',
  white2: '#f9f6fc',
  white3: '#F0F0F0',
  white4: '#EEF1F5',
  grey: '#B1BBCD',

  // SPECIAL COLORS
  // orange
  CustomOrange: '#F15223',
  CustomOrange1: 'rgba(241, 82, 35, 0.8)',
  CustomOrange2: 'rgba(241, 82, 35, 0.6)',
  CustomOrange3: 'rgba(241, 82, 35, 0.4)',
  CustomOrange4: 'rgba(241, 82, 35, 0.2)',
  CustomOrange5: 'rgba(241, 82, 35, 0.1)',

  // Purple
  CustomPurple: '#5041AB',
  CustomPurple1: 'rgba(80, 65, 171, 0.8)',
  CustomPurple2: 'rgba(80, 65, 171, 0.6)',
  CustomPurple3: 'rgba(80, 65, 171, 0.4)',
  CustomPurple4: 'rgba(80, 65, 171, 0.2)',
  CustomPurple5: 'rgba(80, 65, 171, 0.1)',

  // Black
  CustomBlack: '#040415',
  CustomBlack1: 'rgba(4, 4, 21, 0.8)',
  CustomBlack2: 'rgba(4, 4, 21, 0.6)',
  CustomBlack3: 'rgba(4, 4, 21, 0.4)',
  CustomBlack4: 'rgba(4, 4, 21, 0.2)',
  CustomBlack5: 'rgba(4, 4, 21, 0.1)',

  // Green
  CustomGreen: '#65CF58',
  CustomGreen1: 'rgba(101, 207, 88, 0.8)',
  CustomGreen2: 'rgba(101, 207, 88, 0.6)',
  CustomGreen3: 'rgba(101, 207, 88, 0.4)',
  CustomGreen4: 'rgba(101, 207, 88, 0.2)',
  CustomGreen5: 'rgba(101, 207, 88, 0.1)',

  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.4)',
  transparent: 'transparent',
};
export const SIZES = {
  // global sizes
  radius: 24,
  radius2: 14,
  radius3: 8,
  padding: 24,

  // font sizes
  largeTitle: 36,
  font1: width * 0.08,
  font2: width * 0.076,
  font3: width * 0.068,
  font4: width * 0.062,
  font5: width * 0.056,
  font6: width * 0.048,
  font7: width * 0.042,
  font8: width * 0.038,
  font9: width * 0.035,
  font10: width * 0.03,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontSize: SIZES.largeTitle, fontFamily},
  h1: {fontSize: SIZES.font1, fontFamily},
  h2: {fontSize: SIZES.font2, fontFamily},
  h3: {fontSize: SIZES.font3, fontFamily},
  h4: {fontSize: SIZES.font4, fontFamily},
  h5: {fontSize: SIZES.font5, fontFamily},
  h6: {fontSize: SIZES.font6, fontFamily},
  h7: {fontSize: SIZES.font7, fontFamily},
  h8: {fontSize: SIZES.font8, fontFamily},
  h9: {fontSize: SIZES.font9, fontFamily},
  h10: {fontSize: SIZES.font10, fontFamily},
  body1: {fontSize: SIZES.font1, fontFamily},
  body2: {fontSize: SIZES.font2, fontFamily},
  body3: {fontSize: SIZES.font3, fontFamily},
  body4: {fontSize: SIZES.font4, fontFamily},
  body5: {fontSize: SIZES.font5, fontFamily},
  body6: {fontSize: SIZES.font6, fontFamily},
  body7: {fontSize: SIZES.font7, fontFamily},
  body8: {fontSize: SIZES.font8, fontFamily},
  body9: {fontSize: SIZES.font9, fontFamily},
  body10: {fontSize: SIZES.font10, fontFamily},
};

export const darkTheme = {
  name: 'dark',
  backgroundColor: COLORS.black,
  backgroundColor2: COLORS.black2,
  backgroundColor3: COLORS.black,
  backgroundColor4: COLORS.black,
  backgroundColor5: COLORS.black2,
  textColor: COLORS.white,
  textColor2: COLORS.white2,
  textColor3: COLORS.white2,
  tintColor: COLORS.white,
  borderColor: COLORS.white2,
  tabBackgroundColor: COLORS.black,
  bottomTabBarBackgroundColor: COLORS.black,
  headerColor: COLORS.black,
};

export const lightTheme = {
  name: 'light',
  backgroundColor: COLORS.white,
  backgroundColor2: COLORS.white2,
  backgroundColor3: COLORS.white3,
  backgroundColor4: COLORS.white4,
  backgroundColor5: COLORS.white,
  textColor: COLORS.black,
  textColor2: COLORS.primary,
  textColor3: COLORS.primary2,
  tintColor: COLORS.primary,
  borderColor: COLORS.black,
  tabBackgroundColor: COLORS.white,
  bottomTabBarBackgroundColor: COLORS.white,
  headerColor: COLORS.white,
};

export const selectedTheme = lightTheme;

const appTheme = {
  COLORS,
  SIZES,
  FONTS,
  darkTheme,
  lightTheme,
};

export default appTheme;
