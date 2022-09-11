import {
    BRAND_LOADED_FAIL,
    BRAND_LOADED_SUCCESS,
    DELETE_BRAND,
    UPDATE_BRAND,
} from "../Context/Constants";

const InitBrand = {
    brand: null,
    brands: [],
    brandsLoading: true,
};

const brandReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case BRAND_LOADED_SUCCESS:
            return {
                ...state,
                brands: payload,
                brandsLoading: false,
            };

        case BRAND_LOADED_FAIL:
            return {
                ...state,
                brand: [],
                brandsLoading: true,
            };
        case DELETE_BRAND:
            return {
                ...state,
                brands: state.brands.filter((brand) => brand.id !== payload),
            };
        case UPDATE_BRAND:
            const newbrands = state.brands.map((brand) =>
                brand.id === payload.id ? payload : brand
            );
            return {
                ...state,
                products: newbrands,
            };
        default:
            return state;
    }
};

export { InitBrand };
export default brandReducer;
