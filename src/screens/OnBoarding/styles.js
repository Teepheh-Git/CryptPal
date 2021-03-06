import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    width: SIZES.width,
    height: SIZES.height,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    ...FONTS.body8,
    color: COLORS.white2,
    textAlign: "center",
    // width: '65%',
    // bottom: 60,
    marginVertical: 20,
  },
  buttonContainer: {
    // width: SIZES.width,
    bottom: 40,
  },
  dot: {
    height: 6,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: "white",
  },
  pagination: {
    flexDirection: "row",
    height: SIZES.height * 0.02,
  },

  headerContainer: {
    top: 50,
    height: SIZES.font1 * 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 85.84,
    height: 73.73,
  },
});

export default styles;
