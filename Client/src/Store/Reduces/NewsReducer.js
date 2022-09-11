import {
  NEWS_LOADED_FAIL,
  NEWS_LOADED_SUCCESS,
  DELETE_NEWS,
  UPDATE_NEWS,
} from "../Context/Constants";

const InitNews = {
  news: [],
  newsLoading: true,
};

const newReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEWS_LOADED_SUCCESS:
      return {
        ...state,
        news: payload,
        newsLoading: false,
      };

    case NEWS_LOADED_FAIL:
      return {
        ...state,
        new: [],
        newsLoading: true,
      };
    case DELETE_NEWS:
      return {
        ...state,
        news: state.news.filter((newi) => newi.id !== payload),
      };
    // case UPDATE_NEWS:
    //   const newCategorys = state.news.map((new) =>
    //     new.id === payload.id ? payload : new
    //   );
    //   return {
    //     ...state,
    //     products: newCategorys,
    //   };
    default:
      return state;
  }
};

export { InitNews };
export default newReducer;
