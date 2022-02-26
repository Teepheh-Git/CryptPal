import { combineReducers } from "redux";

import marketReducer from "./market/marketReducer";
import themeReducer from "./theme/themeReducer";
import currencyReducer from "./currency/currencyReducer";
import launchReducer from "./launch/launchReducer";

export default combineReducers({
  marketReducer,
  themeReducer,
  currencyReducer,
  launchReducer,
});
