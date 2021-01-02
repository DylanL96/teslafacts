import Cookies from 'js-cookie';

//Setting the cookie
export const setCookie = (key, value) => {
  Cookies.set(key, value, {expires: 1})
}

//Getting the cookie. Key is the name of the cookie
export const getCookie = key => {
  return Cookies.get(key);
}

export const deleteCookie = key => {
  Cookies.remove(key)
}