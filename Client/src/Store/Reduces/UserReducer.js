import {
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  FIND_USER,
} from "../Context/Constants";

const InitUser = {
  user: null,
  users: [],
  usersLoading: true,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
        userLoading: false,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: [],
        userLoading: true,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    case UPDATE_USER:
      const newUsers = state.users.map((user) =>
        user.id === payload.id ? payload : user
      );
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};

export { InitUser };
export default userReducer;
