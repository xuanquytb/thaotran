import { createContext, useReducer, useState } from "react";
import newsCategoryReducer, {
  InitNewsCategorys,
} from "../Reduces/CategoryNewsReducer";
import {
  apiUrl,
  CATEGORYNEWS_LOADED_FAIL,
  CATEGORYNEWS_LOADED_SUCCESS,
  DELETE_CATEGORYNEWS,
  UPDATE_CATEGORYNEWS,
} from "./Constants";
import axios from "axios";

export const CategoryNewsContext = createContext();

const CategoryNewsContextProvider = ({ children }) => {
  // State
  const [newsCategoryState, dispatch] = useReducer(
    newsCategoryReducer,
    InitNewsCategorys
  );
  // Get all CATEGORYNEWS
  const getNewsCategory = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/newsCategory/allNewsCategory`
      );
      if (response.data.success) {
        dispatch({
          type: CATEGORYNEWS_LOADED_SUCCESS,
          payload: response.data.newsCategorys,
        });
      }
    } catch (error) {
      dispatch({ type: CATEGORYNEWS_LOADED_FAIL });
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${apiUrl}/category/${categoryId}`);
      console.log(response);
      if (response.data.success)
        dispatch({ type: DELETE_CATEGORYNEWS, payload: categoryId });
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
          type: UPDATE_CATEGORYNEWS,
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
  const categorynewsContextData = {
    newsCategoryState,
    getNewsCategory,
    deleteCategory,
    createCategory,
    updateCategory,
  };

  return (
    <CategoryNewsContext.Provider value={categorynewsContextData}>
      {children}
    </CategoryNewsContext.Provider>
  );
};

export default CategoryNewsContextProvider;
