import React from "react";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register";
import { AuthContext } from "../../Store/Context/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated, user, roleUser },
    } = useContext(AuthContext);
    console.log(roleUser);
    let body;
    if (authLoading) {
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else {
        if (isAuthenticated == true) {
            if (isAuthenticated && roleUser.id === 2) {
                return <Redirect to='/' />;
            } else if (
                isAuthenticated &&
                (roleUser.id === 1 || roleUser.id === 3)
            ) {
                return <Redirect to='/dashboard' />;
            }
        }
    }

    body = (
        <>
            {authRoute === "login" && <Login />}
            {authRoute === "register" && <Register />}
            {authRoute === "loginAdmin" && <LoginAdmin />}
        </>
    );

    return <>{body}</>;
};

export default Auth;
