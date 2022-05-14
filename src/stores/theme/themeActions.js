import { darkTheme, lightTheme } from "../../constants";
import { toggleThemeBegin, toggleThemeFailure, toggleThemeSuccess } from "./themeTypes";



export function toggleTheme(themeType) {
  return dispatch => {
    dispatch(toggleThemeBegin());

    switch (themeType) {
      case "dark":
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case "light":
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure({ error: "invalid theme type" }));
        break;
    }
  };
}
