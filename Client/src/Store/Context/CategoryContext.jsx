import { createContext, useReducer, useState } from "react";
import categoryReducer, { InitCategory } from "../Reduces/CategoryReducer";
import {
    apiUrl,
    CATEGORY_LOADED_FAIL,
    CATEGORY_LOADED_SUCCESS,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
} from "./Constants";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
    // State
    const [categoryState, dispatch] = useReducer(categoryReducer, InitCategory);
    // Get all CATEGORY
    const getCategory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/category/allCategory`);
            if (response.data.success) {
                dispatch({
                    type: CATEGORY_LOADED_SUCCESS,
                    payload: response.data.categorys,
                });
            }
        } catch (error) {
            dispatch({ type: CATEGORY_LOADED_FAIL });
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(
                `${apiUrl}/category/${categoryId}`
            );
            console.log(response);
            if (response.data.success)
                dispatch({ type: DELETE_CATEGORY, payload: categoryId });
        } catch (error) {
            console.log(error);
        }
    };

    const createCategory = async (CategoryNew) => {
        const category = {
            nameCategory: CategoryNew.nameCategory,
            image: "default.png",
            description: CategoryNew.description,
        };
        const response = await axios.post(
            `${apiUrl}/category/addCategory`,
            category
        );
        console.log(response);
        if (response.data.success) {
            return response.data;
        } else {
            return response.data;
        }
    };

    // // Update user
    const updateCategory = async (updatedCategory) => {
        try {
            const response = await axios.put(
                `${apiUrl}/category/updateCategory/${updatedCategory.id}`,
                updatedCategory
            );
            if (response.data.success) {
                dispatch({
                    type: UPDATE_CATEGORY,
                    payload: response.data.categorys,
                });
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
        categoryState,
        getCategory,
        deleteCategory,
        createCategory,
        updateCategory,
    };

    return (
        <CategoryContext.Provider value={categoryContextData}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContextProvider;
