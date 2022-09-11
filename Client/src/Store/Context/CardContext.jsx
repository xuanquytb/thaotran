import { createContext, useReducer } from "react";
import cardReducer, { InitCard } from "../Reduces/CardReducer";
import { apiUrl, ADD_PRODUCT_CARD, SET_SUMMONEY_CARD } from "./Constants";
import axios from "axios";

export const CardContext = createContext();

const CardContextProvider = ({ children }) => {
    // State
    const [cardState, dispatch] = useReducer(cardReducer, InitCard);
    // Get all PRODUCT
    const getCard = async () => {
        try {
            const response = await axios.get(`${apiUrl}/card/allCard`);
            if (response.data.success) {
                dispatch({
                    type: ADD_PRODUCT_CARD,
                    payload: response.data.card,
                });
            }
        } catch (error) {}
    };

    const getSumMoneyCard = async () => {
        try {
            const response = await axios.get(`${apiUrl}/card/sumMoneycard`);
            console.log(response.data);
            if (response.data.success) {
                dispatch({
                    type: SET_SUMMONEY_CARD,
                    payload: response.data.sum,
                });
            }
        } catch (error) {}
    };

    const createCard = async (itemCard) => {
        const item = {
            idCard: itemCard.idCard,
            idProduct: itemCard.idProduct,
            idCoupon: "",
            dongia: itemCard.dongia,
            quantity: itemCard.quantity,
            sumMoney: itemCard.sumMoney,
        };
        const response = await axios.post(`${apiUrl}/card/addCardItem`, item);
        console.log(response);
        if (response.data.success) {
            dispatch({
                type: "ADD_PRODUCT_CARD",
                payload: {
                    cards: response.data.card,
                },
            });
            return response.data;
        } else {
            return response.data;
        }
    };

    // Product context data
    const cardContextData = {
        cardState,
        getCard,
        createCard,
        getSumMoneyCard,
    };

    return (
        <CardContext.Provider value={cardContextData}>
            {children}
        </CardContext.Provider>
    );
};

export default CardContextProvider;
