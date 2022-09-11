import { createContext, useReducer, useState } from "react";
import brandReducer, { InitBrand } from "../Reduces/BrandReducer";
import {
    apiUrl,
    BRAND_LOADED_FAIL,
    BRAND_LOADED_SUCCESS,
    DELETE_BRAND,
    UPDATE_BRAND,
} from "./Constants";
import axios from "axios";

export const BrandContext = createContext();

const BrandContextProvider = ({ children }) => {
    // State
    const [brandState, dispatch] = useReducer(brandReducer, InitBrand);
    // Get all CATEGORY
    const getBrand = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/manufacturer/allManufacturer`
            );
            if (response.data.success) {
                dispatch({
                    type: BRAND_LOADED_SUCCESS,
                    payload: response.data.brands,
                });
            }
        } catch (error) {
            dispatch({ type: BRAND_LOADED_FAIL });
        }
    };

    const deleteBrand = async (brandId) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/manufacturer/${brandId}`
            );
            if (response.data.success)
                dispatch({ type: DELETE_BRAND, payload: brandId });
        } catch (error) {
            console.log(error);
        }
    };

    const createBrand = async (BrandNew) => {
        const brand = {
            nameManufacturer: BrandNew.nameManufacturer,
            phone: BrandNew.phone,
            address: BrandNew.address,
            mail: BrandNew.mail,
        };
        const response = await axios.post(
            `${apiUrl}/manufacturer/addManufacturer`,
            brand
        );
        if (response.data.success) {
            return response.data;
        } else {
            return response.data;
        }
    };

    // // Update user
    const updateBrand = async (updatedBrand) => {
        try {
            const response = await axios.put(
                `${apiUrl}/manufacturer/updateManufacturer/${updatedBrand.id}`,
                updatedBrand
            );
            if (response.data.success) {
                dispatch({
                    type: UPDATE_BRAND,
                    payload: response.data.brands,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    const brandContextData = {
        brandState,
        getBrand,
        deleteBrand,
        createBrand,
        updateBrand,
    };

    return (
        <BrandContext.Provider value={brandContextData}>
            {children}
        </BrandContext.Provider>
    );
};

export default BrandContextProvider;
