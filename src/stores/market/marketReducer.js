import * as marketActions from './marketActions'


const initialState = {
    coins: [],
    coinCard: [],
    coinSearch: [],
    coinSearch2: [],
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
        case marketActions.GET_SEARCH_MARKET_BEGIN:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_SEARCH_MARKET_SUCCESS: {
            return {
                ...state,
                coinSearch: action.payload.coinSearch
            }
        }

        case marketActions.GET_SEARCH_MARKET_FAILURE: {
            return {
                ...state,
                error: action.payload.error,
            }
        }
        case marketActions.GET_SEARCH_MARKET_BEGIN2:
            return {
                ...state,
                loading: true
            }

        case marketActions.GET_SEARCH_MARKET_SUCCESS2: {
            return {
                ...state,
                coinSearch2: action.payload.coinSearch2
            }
        }

        case marketActions.GET_SEARCH_MARKET_FAILURE2: {
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
