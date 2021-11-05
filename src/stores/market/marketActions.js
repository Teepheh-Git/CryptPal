import axios from 'axios';

export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN"
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS"
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE"

export const GET_CARD_MARKET_BEGIN = "GET_CARD_MARKET_BEGIN"
export const GET_CARD_MARKET_SUCCESS = "GET_CARD_MARKET_SUCCESS"
export const GET_CARD_MARKET_FAILURE = "GET_CARD_MARKET_FAILURE"


export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})
export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: { coins }
})
export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: { error }
})


export const getCardMarketBegin = () => ({
    type: GET_CARD_MARKET_BEGIN
})
export const getCardMarketSuccess = (coinCard) => ({
    type: GET_CARD_MARKET_SUCCESS,
    payload: { coinCard }
})
export const getCardMarketFailure = (error) => ({
    type: GET_CARD_MARKET_FAILURE,
    payload: { error }
})



export const getCoinMarket = (currency = "usd", orderBy = orderBy, sparkline = true, priceChangePerc = "24h", perPage = perPage, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            if (response.status === 200) {
                dispatch(getCoinMarketSuccess(Data));
            } else {
                dispatch(getCoinMarketFailure(Data));
            }
        } catch (e) {
            dispatch(getCoinMarketFailure(e));
        }
    }

}

export const getCardMarket = (currency = "usd", priceChangePerc = '24h', orderBy = 'market_cap_desc', sparkline = true, perPage = 250, page = 1) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`)
            const Data = response.data;
            if (response.status === 200) {
                dispatch(getCardMarketSuccess(Data));
            } else {
                dispatch(getCardMarketFailure(Data));
            }
        } catch (e) {
            dispatch(getCardMarketFailure(e));
        }
    }
}




