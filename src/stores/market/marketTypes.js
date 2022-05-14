export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

export const GET_COIN_MARKET_TREND_BEGIN = "GET_COIN_MARKET_TREND_BEGIN";
export const GET_COIN_MARKET_TREND_SUCCESS = "GET_COIN_MARKET_TREND_SUCCESS";
export const GET_COIN_MARKET_TREND_FAILURE = "GET_COIN_MARKET_TREND_FAILURE";

export const GET_CARD_MARKET_BEGIN = "GET_CARD_MARKET_BEGIN";
export const GET_CARD_MARKET_SUCCESS = "GET_CARD_MARKET_SUCCESS";
export const GET_CARD_MARKET_FAILURE = "GET_CARD_MARKET_FAILURE";

export const GET_NEWS_BEGIN = "GET_NEWS_BEGIN";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";

export const GET_HEADLINE_NEWS_BEGIN = "GET_HEADLINE_NEWS_BEGIN";
export const GET_HEADLINE_NEWS_SUCCESS = "GET_HEADLINE_NEWS_SUCCESS";
export const GET_HEADLINE_NEWS_FAILURE = "GET_HEADLINE_NEWS_FAILURE";

export const GET_FAVOURITES_BEGIN = "GET_FAVOURITES_BEGIN";
export const GET_FAVOURITES_SUCCESS = "GET_FAVOURITES_SUCCESS";
export const GET_FAVOURITES_FAILURE = "GET_FAVOURITES_FAILURE";


export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});
export const getCoinMarketSuccess = (coins) => ({
  type: GET_COIN_MARKET_SUCCESS,
  payload: { coins },
});
export const getCoinMarketFailure = (error) => ({
  type: GET_COIN_MARKET_FAILURE,
  payload: { error },
});

export const getCoinMarketTrendBegin = () => ({
  type: GET_COIN_MARKET_TREND_BEGIN,
});
export const getCoinMarketTrendSuccess = (coinTrend) => ({
  type: GET_COIN_MARKET_TREND_SUCCESS,
  payload: { coinTrend },
});
export const getCoinMarketTrendFailure = (error) => ({
  type: GET_COIN_MARKET_TREND_FAILURE,
  payload: { error },
});


export const getCardMarketBegin = () => ({
  type: GET_CARD_MARKET_BEGIN,
});
export const getCardMarketSuccess = (coinCard) => ({
  type: GET_CARD_MARKET_SUCCESS,
  payload: { coinCard },
});
export const getCardMarketFailure = (error) => ({
  type: GET_CARD_MARKET_FAILURE,
  payload: { error },
});


export const getNewsBegin = () => ({
  type: GET_NEWS_BEGIN,
});
export const getNewsSuccess = (news) => ({
  type: GET_NEWS_SUCCESS,
  payload: { news },
});
export const getNewsFailure = (error) => ({
  type: GET_NEWS_FAILURE,
  payload: { error },
});

export const getHeadlineNewsBegin = () => ({
  type: GET_HEADLINE_NEWS_BEGIN,
});
export const getHeadlineNewsSuccess = (headlineNews) => ({
  type: GET_HEADLINE_NEWS_SUCCESS,
  payload: { headlineNews },
});
export const getHeadlineNewsFailure = (error) => ({
  type: GET_HEADLINE_NEWS_FAILURE,
  payload: { error },
});


export const getFavouritesBegin = () => ({
  type: GET_HEADLINE_NEWS_BEGIN,
});
export const getFavouritesSuccess = (favCoins) => ({
  type: GET_FAVOURITES_SUCCESS,
  payload: { favCoins },
});
export const getFavouritesFailure = (error) => ({
  type: GET_FAVOURITES_FAILURE,
  payload: { error },
});
