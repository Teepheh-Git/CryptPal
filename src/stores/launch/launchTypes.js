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
