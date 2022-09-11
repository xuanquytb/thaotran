import { createContext, useReducer, useState } from "react";
import paymentReducer, { InitPayment } from "../Reduces/PaymentReducer";
import {
  apiUrl,
  PAYMENT_LOADED_FAIL,
  PAYMENT_LOADED_SUCCESS,
  DELETE_PAYMENT,
  UPDATE_PAYMENT,
} from "./Constants";
import axios from "axios";

export const PaymentContext = createContext();

const PaymentContextProvider = ({ children }) => {
  // State
  const [paymentState, dispatch] = useReducer(paymentReducer, InitPayment);

  const getPayment = async () => {
    try {
      const response = await axios.get(`${apiUrl}/payment/allPayment`);
      if (response.data.success) {
        dispatch({
          type: PAYMENT_LOADED_SUCCESS,
          payload: response.data.payment,
        });
      }
    } catch (error) {
      dispatch({ type: PAYMENT_LOADED_FAIL });
    }
  };

  // const deleteBrand = async (brandId) => {
  //   try {
  //     const response = await axios.delete(`${apiUrl}/manufacturer/${brandId}`);
  //     if (response.data.success)
  //       dispatch({ type: DELETE_BRAND, payload: brandId });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const createBrand = async (BrandNew) => {
  //   const brand = {
  //     nameManufacturer: BrandNew.nameManufacturer,
  //     phone: BrandNew.phone,
  //     address: BrandNew.address,
  //     mail: BrandNew.mail,
  //   };
  //   const response = await axios.post(
  //     `${apiUrl}/manufacturer/addManufacturer`,
  //     brand
  //   );
  //   if (response.data.success) {
  //     return response.data;
  //   } else {
  //     return response.data;
  //   }
  // };

  // // // Update user
  // const updateBrand = async (updatedBrand) => {
  //   try {
  //     const response = await axios.put(
  //       `${apiUrl}/manufacturer/updateManufacturer/${updatedBrand.id}`,
  //       updatedBrand
  //     );
  //     if (response.data.success) {
  //       dispatch({
  //         type: UPDATE_BRAND,
  //         payload: response.data.brands,
  //       });
  //       return response.data;
  //     }
  //   } catch (error) {
  //     return error.response.data
  //       ? error.response.data
  //       : { success: false, message: "Server error" };
  //   }
  // };

  const paymentContextData = {
    paymentState,
    getPayment,
    // deleteBrand,
    // createBrand,
    // updateBrand,
  };

  return (
    <PaymentContext.Provider value={paymentContextData}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContextProvider;
