import {
    CATEGORY_LOADED_FAIL,
    CATEGORY_LOADED_SUCCESS,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
} from "../Context/Constants";

const InitCategory = {
    category: null,
    categorys: [],
    categorysLoading: true,
};

const categoryReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORY_LOADED_SUCCESS:
            return {
                ...state,
                categorys: payload,
                categorysLoading: false,
            };

        case CATEGORY_LOADED_FAIL:
            return {
                ...state,
                category: [],
                categorysLoading: true,
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categorys: state.categorys.filter(
                    (category) => category.id !== payload
                ),
            };
        case UPDATE_CATEGORY:
            const newCategorys = state.categorys.map((category) =>
                category.id === payload.id ? payload : category
            );
            return {
                ...state,
                products: newCategorys,
            };
        default:
            return state;
    }
};

export { InitCategory };
export default categoryReducer;
