import { favorite, home, news } from "../../constants";

export const TOGGLE_LAUNCH_BEGIN = "TOGGLE_LAUNCH_BEGIN";
export const TOGGLE_LAUNCH_SUCCESS = "TOGGLE_LAUNCH_SUCCESS";
export const TOGGLE_LAUNCH_FAILURE = "TOGGLE_LAUNCH_FAILURE";

export const toggleLaunchBegin = () => ({
  type: TOGGLE_LAUNCH_BEGIN,
});

export const toggleLaunchSuccess = selectedLaunch => ({
  type: TOGGLE_LAUNCH_SUCCESS,
  payload: { selectedLaunch },
});
export const toggleLaunchFailure = error => ({
  type: TOGGLE_LAUNCH_FAILURE,
  payload: { error },
});


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
