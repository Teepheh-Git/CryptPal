import { selectedCurrency } from "../../constants";
import * as currencyActionTypes from "./currencyTypes";


const initialState = {
  appCurrency: selectedCurrency,
  error: null,
};


const currencyReducer = (state = initialState, action) => {

  switch (action.type) {
    case currencyActionTypes.TOGGLE_CURRENCY_BEGIN:
      return {
        ...state,
        error: null,
      };
    case currencyActionTypes.TOGGLE_CURRENCY_SUCCESS:
      return {
        ...state,
        appCurrency: action.payload.selectedCurrency,
      };
    case currencyActionTypes.TOGGLE_CURRENCY_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};


export default currencyReducer;
