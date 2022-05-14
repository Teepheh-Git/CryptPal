import { selectedLaunch } from "../../constants";
import * as launchActionTypes from "./launchTypes";


const initialState = {
  appLaunch: selectedLaunch,
  error: null,
};


const launchReducer = (state = initialState, action) => {

  switch (action.type) {
    case launchActionTypes.TOGGLE_LAUNCH_BEGIN:
      return {
        ...state,
        error: null,
      };
    case launchActionTypes.TOGGLE_LAUNCH_SUCCESS:
      return {
        ...state,
        appLaunch: action.payload.selectedLaunch,
      };
    case launchActionTypes.TOGGLE_LAUNCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};


export default launchReducer;
