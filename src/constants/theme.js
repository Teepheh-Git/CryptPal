import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // primary colors
  primary: "#6B55D0",
  primary2: "#B1BBCD",
  black: "#040415",
  black2: "#000000",
  white: "#FFF",
  white2: "#f9f6fc",
  white3: "#F0F0F0",
  white4: "#EEF1F5",
  grey: "#B1BBCD",


  // SPECIAL COLORS
  // orange
  CustomOrange: "#F15223",
  CustomOrange1: "rgba(241, 82, 35, 0.8)",
  CustomOrange2: "rgba(241, 82, 35, 0.6)",
  CustomOrange3: "rgba(241, 82, 35, 0.4)",
  CustomOrange4: "rgba(241, 82, 35, 0.2)",
  CustomOrange5: "rgba(241, 82, 35, 0.1)",

  // Purple
  CustomPurple: "#5041AB",
  CustomPurple1: "rgba(80, 65, 171, 0.8)",
  CustomPurple2: "rgba(80, 65, 171, 0.6)",
  CustomPurple3: "rgba(80, 65, 171, 0.4)",
  CustomPurple4: "rgba(80, 65, 171, 0.2)",
  CustomPurple5: "rgba(80, 65, 171, 0.1)",

  // Black
  CustomBlack: "#040415",
  CustomBlack1: "rgba(4, 4, 21, 0.8)",
  CustomBlack2: "rgba(4, 4, 21, 0.6)",
  CustomBlack3: "rgba(4, 4, 21, 0.4)",
  CustomBlack4: "rgba(4, 4, 21, 0.2)",
  CustomBlack5: "rgba(4, 4, 21, 0.1)",

  // Green
  CustomGreen: "#65CF58",
  CustomGreen1: "rgba(101, 207, 88, 0.8)",
  CustomGreen2: "rgba(101, 207, 88, 0.6)",
  CustomGreen3: "rgba(101, 207, 88, 0.4)",
  CustomGreen4: "rgba(101, 207, 88, 0.2)",
  CustomGreen5: "rgba(101, 207, 88, 0.1)",

  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
  transparent: "transparent",
};
export const SIZES = {
  // global sizes
  radius: 24,
  radius2: 14,
  radius3: 8,
  padding: 24,


  // font sizes
  largeTitle: 36,
  font1: 24,
  font2: 18,
  font3: 16,
  font4: 14,
  font5: 12,
  font6: 10,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontSize: SIZES.largeTitle,  fontWeight: "bold",fontFamily:"PublicaSansRound-Thin"  },
  h1: { fontSize: SIZES.font1,  fontWeight: "bold", fontFamily:"PublicaSansRound-Thin" },
  h2: { fontSize: SIZES.font2,  fontWeight: "bold",fontFamily:"PublicaSansRound-Thin"  },
  h3: { fontSize: SIZES.font3,  fontWeight: "bold" ,fontFamily:"PublicaSansRound-Thin" },
  h4: { fontSize: SIZES.font4, fontWeight: "bold",fontFamily:"PublicaSansRound-Thin"  },
  h5: { fontSize: SIZES.font5, fontWeight: "bold",fontFamily:"PublicaSansRound-Thin"  },
  body1: { fontSize: SIZES.font1,  fontWeight: "normal",fontFamily:"PublicaSansRound-Thin"  },
  body2: { fontSize: SIZES.font2, fontWeight: "normal" ,fontFamily:"PublicaSansRound-Thin" },
  body3: { fontSize: SIZES.font3,  fontWeight: "normal",fontFamily:"PublicaSansRound-Thin"  },
  body4: { fontSize: SIZES.font4, fontWeight: "normal",fontFamily:"PublicaSansRound-Thin"  },
  body5: { fontSize: SIZES.font5,  fontWeight: "normal",fontFamily:"PublicaSansRound-Thin"  },
  body6: { fontSize: SIZES.font6,  fontWeight: "normal",fontFamily:"PublicaSansRound-Thin"  },
};

export const darkTheme = {
  name: "dark",
  backgroundColor: COLORS.black,
  backgroundColor2: COLORS.black2,
  backgroundColor3: COLORS.black,
  backgroundColor4: COLORS.black2,
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
  name: "light",
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
