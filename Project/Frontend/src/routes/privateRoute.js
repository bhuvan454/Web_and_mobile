import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
           {...rest}
           render={(props) => 
             isLogin() ? <Component /> : <Redirect to={{ pathname: '/login' }} />
           } 
        />
    )
}

export default PrivateRoute;