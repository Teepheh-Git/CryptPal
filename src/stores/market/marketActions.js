import axios from "axios";

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
//
// export const GET_SEARCH_MARKET_BEGIN2 = "GET_SEARCH_MARKET_BEGIN2";
// export const GET_SEARCH_MARKET_SUCCESS2 = "GET_SEARCH_MARKET_SUCCESS2";
// export const GET_SEARCH_MARKET_FAILURE2 = "GET_SEARCH_MARKET_FAILURE2";


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

//
//
// export const getSearchMarketBegin2 = () => ({
//   type: GET_SEARCH_MARKET_BEGIN2,
// });
// export const getSearchMarketSuccess2 = (coinSearch2) => ({
//   type: GET_SEARCH_MARKET_SUCCESS2,
//   payload: { coinSearch2 },
// });
// export const getSearchMarketFailure2 = (error) => ({
//   type: GET_SEARCH_MARKET_FAILURE2,
//   payload: { error },
// });


export const getCoinMarket = (currency = "usd", orderBy = orderBy, sparkline = true, priceChangePerc = "24h", perPage = perPage, page = 1) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);
      const Data = response.data;
      if (response.status === 200) {
        dispatch(getCoinMarketSuccess(Data));
      } else {
        dispatch(getCoinMarketFailure(Data));
      }
    } catch (e) {
      dispatch(getCoinMarketFailure(e));
    }
  };

};

export const getCoinMarketTrend = (currency = "usd", orderBy = orderBy, sparkline = true, priceChangePerc = "24h", perPage = perPage, page = 1) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);
      const Data = response.data;
      if (response.status === 200) {
        dispatch(getCoinMarketTrendSuccess(Data));
      } else {
        dispatch(getCoinMarketFailure(Data));
      }
    } catch (e) {
      dispatch(getCoinMarketTrendFailure(e));
    }
  };

};


export const getNewsMarket = (keyword = "crypto", category = "publishedAt") => {
  return async dispatch => {
    try {
      const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&searchIn=title&sortBy=${category}&language=en&sortBy=publishedAt&pageSize=10&apiKey=72d2a0865ac740eb860785c920c9f54e`);

      const Data = newsRes.data.articles;

      // console.log(Data, "DOYYYY");
      if (Data) {
        dispatch(getNewsSuccess(Data));
      } else {
        dispatch(getNewsFailure(Data));
      }
    } catch (e) {
      dispatch(getNewsFailure(e));
    }
  };
};

export const getHeadlineNewsMarket = () => {
  return async dispatch => {
    try {
      const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=$crypto&searchIn=title&sortBy=publishedAt&language=en&sortBy=publishedAt&pageSize=5&apiKey=72d2a0865ac740eb860785c920c9f54e`);

      const Data = newsRes.data.articles;

      console.log(Data, "DOYYYY");
      if (Data) {
        dispatch(getHeadlineNewsSuccess(Data));
      } else {
        dispatch(getHeadlineNewsFailure(Data));
      }
    } catch (e) {
      console.log(e,"ERRRRR");
      dispatch(getHeadlineNewsFailure(e));
    }
  };
};


// export const getSearchMarket2 = (currency = "usd", orderBy = orderBy, sparkline = true, priceChangePerc = "24h", perPage = 250, page = 3) => {
//   return async dispatch => {
//     try {
//       const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);
//       const Data = response.data;
//       if (response.status === 200) {
//         dispatch(getSearchMarketSuccess2(Data));
//       } else {
//         dispatch(getSearchMarketFailure2(Data));
//       }
//     } catch (e) {
//       dispatch(getSearchMarketFailure2(e));
//     }
//   };
//
// };

export const getCardMarket = (currency = "usd", priceChangePerc = "24h", orderBy = "market_cap_desc", sparkline = true, perPage = 50, page = 1) => {
  return async dispatch => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`);
      const Data = response.data;
      if (response.status === 200) {
        dispatch(getCardMarketSuccess(Data));
      } else {
        dispatch(getCardMarketFailure(Data));
      }
    } catch (e) {
      dispatch(getCardMarketFailure(e));
    }
  };
};




