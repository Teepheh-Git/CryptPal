import { favorite, home, news } from "../../constants";
import { toggleLaunchBegin, toggleLaunchFailure, toggleLaunchSuccess } from "./launchTypes";




export function toggleLaunch(launchType) {
  return dispatch => {
    dispatch(toggleLaunchBegin());

    switch (launchType) {
      case "Home":
        dispatch(toggleLaunchSuccess(home));
        break;
      case "Favorite":
        dispatch(toggleLaunchSuccess(favorite));
        break;
      case "News":
        dispatch(toggleLaunchSuccess(news));
        break;
      default:
        dispatch(toggleLaunchFailure({ error: "Invalid launch type" }));
        break;
    }
  };
}
