import {setCookie, getCookie, deleteCookie} from './cookies';
import {setLocalStorage, getLocalStorage, deleteLocalStorage} from './localStorage'

export const setAuthentication = (token, user) => {
  
  //Cookie takes name and value. The name is called 'token' and the value is the token we placed as an argument.
  setCookie('token', token);
  setLocalStorage('user', user)
};

export const isAuthenticated = () => {
  if (getCookie('token') && getLocalStorage('user')){
    //If those conditions are met, we will return the user object
    return getLocalStorage('user')
  } else {
    return false;
  }
};

export const logout = next => {
  deleteCookie('token');
  deleteLocalStorage('user');

  next();
}