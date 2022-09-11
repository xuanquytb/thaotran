import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated, roleUser },
    } = useContext(AuthContext);
    if (authLoading) {
        return (
            <div className='spinner-containe'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated &&
                (roleUser.id === 2 ||
                    roleUser.id === 1 ||
                    roleUser.id === 3) ? (
                    <>
                        <Component {...rest} {...props} />
                    </>
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default ProtectedRoute;
