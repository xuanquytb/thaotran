export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:8080/api"
        : "http://138.2.55.193/api";

export const LOCAL_STORAGE_TOKEN_NAME = "token_doan";

export const USER_LOADED_SUCCESS = "USER_LOADED_SUCCESS";
export const USER_LOADED_FAIL = "USER_LOADED_FAIL";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const FIND_USER = "FIND_USER";

/////////////////////////////////////////////////////////
// Product///////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const PRODUCT_LOADED_SUCCESS = "PRODUCT_LOADED_SUCCESS";
export const PRODUCT_LOADED_SUCCESSCT = "PRODUCT_LOADED_SUCCESSCT";
export const PRODUCT_LOADED_FAIL = "PRODUCT_LOADED_FAIL";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FIND_PRODUCT = "FIND_PRODUCT";
/////////////////////////////////////////////////////////
// Category//////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const CATEGORY_LOADED_SUCCESS = "CATEGORY_LOADED_SUCCESS";
export const CATEGORY_LOADED_FAIL = "CATEGORY_LOADED_FAIL";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const FIND_CATEGORY = "FIND_CATEGORY";
/////////////////////////////////////////////////////////
// Brand/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const BRAND_LOADED_SUCCESS = "BRAND_LOADED_SUCCESS";
export const BRAND_LOADED_FAIL = "BRAND_LOADED_FAIL";
export const ADD_BRAND = "ADD_BRAND";
export const DELETE_BRAND = "DELETE_BRAND";
export const UPDATE_BRAND = "UPDATE_BRAND";
export const FIND_BRAND = "FIND_BRAND";
/////////////////////////////////////////////////////////
// Payment/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const PAYMENT_LOADED_SUCCESS = "PAYMENT_LOADED_SUCCESS";
export const PAYMENT_LOADED_FAIL = "PAYMENT_LOADED_FAIL";
export const ADD_PAYMENT = "ADD_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const FIND_PAYMENT = "FIND_PAYMENT";
/////////////////////////////////////////////////////////
// Order/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const ORDER_LOADED_SUCCESS = "ORDER_LOADED_SUCCESS";
export const ORDER_LOADEDMONEY_SUCCESS = "ORDER_LOADEDMONEY_SUCCESS";
export const ORDER_LOADED_FAIL = "ORDER_LOADED_FAIL";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const FIND_ORDER = "FIND_ORDER";
/////////////////////////////////////////////////////////
// News/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const NEWS_LOADED_SUCCESS = "NEWS_LOADED_SUCCESS";
export const NEWS_LOADED_FAIL = "NEWS_LOADED_FAIL";
export const ADD_NEWS = "ADD_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";
export const UPDATE_NEWS = "UPDATE_NEWS";
export const FIND_NEWS = "FIND_NEWS";
/////////////////////////////////////////////////////////
// CategoryNews/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const CATEGORYNEWS_LOADED_SUCCESS = "CATEGORYNEWS_LOADED_SUCCESS";
export const CATEGORYNEWS_LOADED_FAIL = "CATEGORYNEWS_LOADED_FAIL";
export const ADD_CATEGORYNEWS = "ADD_CATEGORYNEWS";
export const DELETE_CATEGORYNEWS = "DELETE_CATEGORYNEWS";
export const UPDATE_CATEGORYNEWS = "UPDATE_CATEGORYNEWS";
export const FIND_CATEGORYNEWS = "FIND_CATEGORYNEWS";
/////////////////////////////////////////////////////////
// Card/////////////////////////////////////////////////
/////////////////////////////////////////////////////////
export const ADD_PRODUCT_CARD = "ADD_PRODUCT_CARD";
export const DELETE_PRODUCT_CARD = "DELETE_PRODUCT_CARD";
export const SET_SUMMONEY_CARD = "SET_SUMMONEY_CARD";
