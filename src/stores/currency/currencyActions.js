import { aud, cad, chf, eur, jpy, ngn, usd } from "../../constants";
import { toggleCurrencyBegin, toggleCurrencyFailure, toggleCurrencySuccess } from "./currencyTypes";




export function toggleCurrency(currencyType) {
  return dispatch => {
    dispatch(toggleCurrencyBegin());

    switch (currencyType) {
      case "dollar":
        dispatch(toggleCurrencySuccess(usd));
        break;
      case "naira":
        dispatch(toggleCurrencySuccess(ngn));
        break;
      case "euro":
        dispatch(toggleCurrencySuccess(eur));
        break;
      case "yen":
        dispatch(toggleCurrencySuccess(jpy));
        break;
      case "aus dollar":
        dispatch(toggleCurrencySuccess(aud));
        break;
      case "swiss franc":
        dispatch(toggleCurrencySuccess(chf));
        break;
      case "can dollar":
        dispatch(toggleCurrencySuccess(cad));
        break;
      default:
        dispatch(toggleCurrencyFailure({ error: "Invalid currency type" }));
        break;
    }
  };
}
