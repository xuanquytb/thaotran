import {
  PAYMENT_LOADED_FAIL,
  PAYMENT_LOADED_SUCCESS,
  DELETE_PAYMENT,
  UPDATE_PAYMENT,
} from "../Context/Constants";

const InitPayment = {
  payment: null,
  payments: [],
};

const paymentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PAYMENT_LOADED_SUCCESS:
      return {
        ...state,
        payments: payload,
        paymentsLoading: false,
      };

    case PAYMENT_LOADED_FAIL:
      return {
        ...state,
        payment: [],
        paymentsLoading: true,
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter((payment) => payment.id !== payload),
      };
    case UPDATE_PAYMENT:
      const newpayments = state.payments.map((payment) =>
        payment.id === payload.id ? payload : payment
      );
      return {
        ...state,
        products: newpayments,
      };
    default:
      return state;
  }
};

export { InitPayment };
export default paymentReducer;
