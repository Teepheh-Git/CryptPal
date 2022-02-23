import * as marketActions from "./marketActions";


const initialState = {
  coins: [],
  coinCard: [],
  coinTrend: [],
  news: [],
  headlineNews: [],
  // searchCoin: [],
  // coinSearch2: [],
  error: null,
  loading: false,
};


const marketReducer = (state = initialState, action) => {
  switch (action.type) {

    case marketActions.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case marketActions.GET_COIN_MARKET_SUCCESS: {
      return {
        ...state,
        coins: action.payload.coins,
      };
    }

    case marketActions.GET_COIN_MARKET_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case marketActions.GET_CARD_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case marketActions.GET_CARD_MARKET_SUCCESS: {
      return {
        ...state,
        coinCard: action.payload.coinCard,
      };
    }

    case marketActions.GET_CARD_MARKET_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case marketActions.GET_COIN_MARKET_TREND_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case marketActions.GET_COIN_MARKET_TREND_SUCCESS: {
      return {
        ...state,
        coinTrend: action.payload.coinTrend,
      };
    }

    case marketActions.GET_COIN_MARKET_TREND_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case marketActions.GET_NEWS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case marketActions.GET_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload.news,
      };
    }

    case marketActions.GET_NEWS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case marketActions.GET_HEADLINE_NEWS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case marketActions.GET_HEADLINE_NEWS_SUCCESS: {
      return {
        ...state,
        headlineNews: action.payload.headlineNews,
      };
    }

    case marketActions.GET_HEADLINE_NEWS_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    default:
      return state;
  }
};

export default marketReducer;
