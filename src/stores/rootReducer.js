import { combineReducers } from 'redux';

import marketReducer from "./market/marketReducer";
import themeReducer from "./theme/themeReducer";

export default combineReducers({
    marketReducer,
    themeReducer
})
