import Cookies from "universal-cookie";
import {isEmpty} from "./common";

export const cookies = new Cookies();
export const getCsrfToken = () => cookies.get('csrf_token');
export const setCsrfToken = token => cookies.set('csrf_token', token);

export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const setRefreshToken = token => localStorage.setItem('refresh_token', token);
export const removeRefreshToken = () => localStorage.removeItem('refresh_token');

export const getCurrentUser = () => {
    return sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData')) : {}
}

export const setCurrentUser = user => sessionStorage.setItem('userData', JSON.stringify(user));
export const removeCurrentUser = () => sessionStorage.removeItem('userData');

export const checkIsLoggedIn = () => {
    const currentUser = getCurrentUser();
    return currentUser && !isEmpty(currentUser);
}