import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../helpers/auth';

const RegisteredRoute = ({ component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => 
        // eslint-disable-next-line
        isAuthenticated()  ? (
            <Component {...props} />
        ) : (
            <Redirect to='/signin' />
        )
      }
    />
  )
};

export default RegisteredRoute;