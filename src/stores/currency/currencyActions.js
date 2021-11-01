import { usd, ngn, eur, jpy } from '../../constants'

export const TOGGLE_CURRENCY_BEGIN = 'TOGGLE_CURRENCY_BEGIN';
export const TOGGLE_CURRENCY_SUCCESS = 'TOGGLE_CURRENCY_SUCCESS';
export const TOGGLE_CURRENCY_FAILURE = 'TOGGLE_CURRENCY_FAILURE';

export const toggleCurrencyBegin = () => ({
    type: TOGGLE_CURRENCY_BEGIN
});

export const toggleCurrencySuccess = selectedCurrency => ({
    type: TOGGLE_CURRENCY_SUCCESS,
    payload: { selectedCurrency }
})
export const toggleCurrencyFailure = error => ({
    type: TOGGLE_CURRENCY_FAILURE,
    payload: { error }
})


export function toggleCurrency(currencyType) {
    return dispatch => {
        dispatch(toggleCurrencyBegin());

        switch (currencyType) {
            case 'dollar':
                dispatch(toggleCurrencySuccess(usd));
                break;
            case 'naira':
                dispatch(toggleCurrencySuccess(ngn));
                break;
            case 'euro':
                dispatch(toggleCurrencySuccess(eur));
                break;
            case 'yen':
                dispatch(toggleCurrencySuccess(jpy));
                break;
            default:
                dispatch(toggleCurrencyFailure({ error: 'Invalid currency type' }))
                break;
        }
    }
}