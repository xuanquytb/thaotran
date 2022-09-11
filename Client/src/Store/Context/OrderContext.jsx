import { createContext, useReducer, useState } from "react";
import orderReducer, { InitOrder } from "../Reduces/OrderReducer";
import {
    apiUrl,
    ORDER_LOADED_FAIL,
    ORDER_LOADED_SUCCESS,
    DELETE_ORDER,
    UPDATE_ORDER,
    ORDER_LOADEDMONEY_SUCCESS,
} from "./Constants";
import axios from "axios";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    // State
    const [orderState, dispatch] = useReducer(orderReducer, InitOrder);
    // Get all CATEGORY
    const getOrder = async () => {
        var today = new Date();

        var valueToday = today
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("/");
        try {
            const response = await axios.get(`${apiUrl}/Order/allOrderAdmin`);
            const datare = await axios.get(
                "http://localhost:8080/api/countOrMonth/countMonth"
            );
            const responseMoney = await axios.get(
                `${apiUrl}/Order/allSummoney`
            );
            const responseUser = await axios.get(`${apiUrl}/Order/countUser`);
            const responseMoneyDay = await axios.post(
                `${apiUrl}/Order/allSummoney/day`,
                {
                    day: valueToday,
                }
            );
            if (response.data.success) {
                dispatch({
                    type: ORDER_LOADED_SUCCESS,
                    payload: {
                        orders: response.data.orders,
                        monney: responseMoney.data.monney.summoney,
                        monneyDay: responseMoneyDay.data.monney.summoney,
                        countUser: responseUser.data.countUser.countUser,
                        countMonth: datare.data.datamonth,
                    },
                });
            }
        } catch (error) {
            // dispatch({ type: ORDER_LOADED_FAIL });
        }
    };
    const getOrderCustomer = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/Order/allOrderCustomer`
            );

            if (response.data.success) {
                dispatch({
                    type: ORDER_LOADED_SUCCESS,
                    payload: {
                        orders: response.data.orders,
                    },
                });
            }
        } catch (error) {
            dispatch({ type: ORDER_LOADED_FAIL });
        }
    };
    const getCountOrderCustomer = async () => {
        try {
            const response = await axios.get(`${apiUrl}/Order/countOrderCus`);

            if (response.data.success) {
                return response.data.countOrderUser;
            }
        } catch (error) {
            dispatch({ type: ORDER_LOADED_FAIL });
        }
    };

    const createOrder = async (OrderNew) => {
        const orderDetail = {
            idCard: OrderNew.idCard,
            idCustomer: OrderNew.idCustomer,
            sumPayment: OrderNew.sumPayment,
            address: OrderNew.address,
            idPayment: OrderNew.idPayment,
        };
        const response = await axios.post(
            `${apiUrl}/Order/addOrderDetail`,
            orderDetail
        );
        if (response.data.success) {
            return response.data;
        } else {
            return response.data;
        }
    };
    const createOrderPayOnline = async (OrderNew) => {
        const orderDetail = {
            idCard: OrderNew.idCard,
            idCustomer: OrderNew.idCustomer,
            sumPayment: OrderNew.sumPayment,
            address: OrderNew.address,
            idPayment: OrderNew.idPayment,
        };
        const response = await axios.post(
            `${apiUrl}/Order/addOrderPayOnlineDetail`,
            orderDetail
        );
        if (response.data.success) {
            return response.data;
        } else {
            return response.data;
        }
    };

    const updateOrder = async (updatedOrder) => {
        try {
            const response = await axios.put(
                `${apiUrl}/Order/updateState/${updatedOrder.id}`,
                updatedOrder
            );
            if (response.data.success) {
                dispatch({
                    type: ORDER_LOADED_SUCCESS,
                    payload: {
                        orders: response.data.orders,
                    },
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };
    const updateOrderState = async (updatedOrder) => {
        try {
            const response = await axios.put(
                `${apiUrl}/Order/updateStateDetailOrder/${updatedOrder.id}`,
                updatedOrder
            );
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Product context data
    const categoryContextData = {
        orderState,
        getOrder,
        updateOrderState,
        createOrder,
        updateOrder,
        getOrderCustomer,
        getCountOrderCustomer,
        createOrderPayOnline,
    };

    return (
        <OrderContext.Provider value={categoryContextData}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;
