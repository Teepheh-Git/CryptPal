import { combineReducers } from 'redux';

import marketReducer from "./market/marketReducer";
import themeReducer from "./theme/themeReducer";
import currencyReducer from "./currency/currencyReducer";

export default combineReducers({
    marketReducer,
    themeReducer,
    currencyReducer
})
