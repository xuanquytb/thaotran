import {
    ORDER_LOADED_FAIL,
    ORDER_LOADED_SUCCESS,
    DELETE_ORDER,
} from "../Context/Constants";

const InitOrder = {
    sumMoney: 0,
    monneyDay: 0,
    countUser: 0,
    order: null,
    countMonth: [],
    orders: [],
};

const orderReducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
        case ORDER_LOADED_SUCCESS:
            return {
                ...state,
                orders: payload.orders,
                sumMoney: payload.monney,
                monneyDay: payload.monneyDay,
                countUser: payload.countUser,
                countMonth: payload.countMonth,
            };
        case ORDER_LOADED_FAIL:
            return {
                ...state,
                order: [],
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order) => order.id !== payload),
            };
        // case UPDATE_CATEGORY:
        //   const newOrders = state.orders.map((order) =>
        //     order.id === payload.id ? payload : order
        //   );
        //   return {
        //     ...state,
        //     products: newOrders,
        //   };
        default:
            return state;
    }
};

export { InitOrder };
export default orderReducer;
