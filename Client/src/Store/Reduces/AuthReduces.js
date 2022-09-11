const initState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    roleUser: null,
};

const authReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, user, roleUser },
    } = action;
    switch (type) {
        case "SET_AUTH": {
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                roleUser,
            };
        }

        default:
            return { state };
    }
};
export { initState };
export default authReducer;
