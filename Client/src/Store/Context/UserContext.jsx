import { createContext, useReducer, useState } from "react";
import userReducer, { InitUser } from "../Reduces/UserReducer";
import {
  apiUrl,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  FIND_USER,
} from "./constants";
import axios from "axios";

export const UserContext = createContext();

const UsersContextProvider = ({ children }) => {
  // State
  const [userState, dispatch] = useReducer(userReducer, InitUser);
  // Get all user
  const getCustomer = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/customer`);
      if (response.data.success) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: response.data.users,
        });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIL });
    }
  };
  const getEmployee = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/allEmployee`);
      if (response.data.success) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: response.data.users,
        });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIL });
    }
  };
  const getAdmin = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/allAdmin`);
      if (response.data.success) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: response.data.users,
        });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIL });
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/auth/${userId}`);
      console.log(response);
      if (response.data.success)
        dispatch({ type: DELETE_USER, payload: userId });
    } catch (error) {
      console.log(error);
    }
  };

  const registerAdmin = async (Admin) => {
    if (Admin.password === Admin.passwordRe) {
      const user = {
        username: Admin.username,
        password: Admin.password,
        fullname: Admin.fullname,
        nameRole: "Administrators",
        email: Admin.email,
        phone: Admin.phone,
        address: Admin.address,
        sex: Admin.sex,
        dateOfBirth: Admin.dateOfBirth,
        nameAvata: "default.png",
      };
      const response = await axios.post(`${apiUrl}/auth/createAdmin`, user);
      if (response.data.success) {
        return response.data;
      } else {
        return response.data;
      }
    } else {
      return {
        success: false,
        type: "wrongPass",
        message: "Mật khẩu nhập lại không chính xác",
      };
    }
  };
  const registerEmployee = async (Employee) => {
    if (Employee.password === Employee.passwordRe) {
      const user = {
        username: Employee.username,
        password: Employee.password,
        fullname: Employee.fullname,
        nameRole: "Employee",
        email: Employee.email,
        phone: Employee.phone,
        address: Employee.address,
        sex: Employee.sex,
        dateOfBirth: Employee.dateOfBirth,
        nameAvata: "default.png",
      };
      const response = await axios.post(`${apiUrl}/auth/createEmloyee`, user);
      if (response.data.success) {
        return response.data;
      } else {
        return response.data;
      }
    } else {
      return {
        success: false,
        type: "wrongPass",
        message: "Mật khẩu nhập lại không chính xác",
      };
    }
  };

  // // Update user
  const updateUser = async (updatedCustomer) => {
    try {
      const response = await axios.put(
        `${apiUrl}/auth/update/${updatedCustomer.id}`,
        updatedCustomer
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_USER, payload: response.data.users });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // User context data
  const userContextData = {
    userState,
    getAdmin,
    getEmployee,
    getCustomer,
    deleteUser,
    updateUser,
    registerAdmin,
    registerEmployee,
  };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UsersContextProvider;
