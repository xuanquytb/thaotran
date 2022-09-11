import {
  CATEGORYNEWS_LOADED_FAIL,
  CATEGORYNEWS_LOADED_SUCCESS,
  DELETE_CATEGORYNEWS,
  UPDATE_CATEGORYNEWS,
} from "../Context/Constants";

const InitNewsCategorys = {
  categoryNews: [],
  categoryNewsLoading: true,
};

const newsCategoryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORYNEWS_LOADED_SUCCESS:
      return {
        ...state,
        categoryNews: payload,
        categoryNewsLoading: false,
      };

    case CATEGORYNEWS_LOADED_FAIL:
      return {
        ...state,
        new: [],
        categoryNewsLoading: true,
      };
    case DELETE_CATEGORYNEWS:
      return {
        ...state,
        categoryNews: state.categoryNews.filter(
          (category) => category.id !== payload
        ),
      };
    // case UPDATE_CATEGORYNEWS:
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

export { InitNewsCategorys };
export default newsCategoryReducer;
