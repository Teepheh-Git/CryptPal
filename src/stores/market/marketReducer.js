import * as marketActions from './marketActions'


const initialState = {
    coins: [],
    cardCoin: [],
    error: null,
    loading: false
}


const marketReducer = (state = initialState, action) => {
    switch (action.type) {

        case marketActions.GET_COIN_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_COIN_MARKET_SUCCESS: {
            return {
                ...state,
                coins: action.payload.coins
            }
        }

        case marketActions.GET_COIN_MARKET_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
            }
        }
        case marketActions.GET_CARD_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_CARD_MARKET_SUCCESS: {
            return {
                ...state,
                coinCard: action.payload.coinCard
            }
        }

        case marketActions.GET_CARD_MARKET_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
            }
        }

        default:
            return state
    }
}

export default marketReducer;
