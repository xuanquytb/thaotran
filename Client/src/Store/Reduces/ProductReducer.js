import {
  PRODUCT_LOADED_FAIL,
  PRODUCT_LOADED_SUCCESS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_LOADED_SUCCESSCT,
} from "../Context/Constants";

const InitProduct = {
  product: null,
  products: [],
  productsLoading: true,
};

const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LOADED_SUCCESS:
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };
    case PRODUCT_LOADED_SUCCESSCT:
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };

    case PRODUCT_LOADED_FAIL:
      return {
        ...state,
        product: [],
        productsLoading: true,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload),
      };
    case UPDATE_PRODUCT:
      const newProducts = state.products.map((product) =>
        product.id === payload.id ? payload : product
      );
      return {
        ...state,
        products: newProducts,
      };
    default:
      return state;
  }
};

export { InitProduct };
export default productReducer;
