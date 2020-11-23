import {REQUEST, FAILURE, SUCCESS, LOGIN, LOGOUT, SIGNUP} from "../constants/ActionTypes";
import { mainAxios, checkResponseError } from "../utils/requests";

import {
    setToken,
    removeToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    setCurrentUser,
    removeCurrentUser
} from "../utils/storages";
import {getUserData} from "./userAction";


const boundLoginRequest = () => ({ type: LOGIN + "_" + REQUEST });
const boundLoginSuccess = token => ({ type: LOGIN + "_" + SUCCESS, payload: token.access, refresh_token: token.refresh });
const boundLoginFailure = error => ({ type: LOGIN + "_" + FAILURE, payload: error });

export const login = ({ username, password }) => (dispatch) => {
    dispatch(boundLoginRequest())
    return mainAxios.post("auth/jwt/create/", {
            username,
            password,
        })
        .then((response) => {
            const token = response.data;

            if (token) {
                setToken(token.access);
                setRefreshToken(token.refresh);
                dispatch(getUserData())

                return dispatch(boundLoginSuccess(token));
            }
        })
        .catch(err => dispatch(boundLoginFailure(checkResponseError(err))));
};


const boundLogoutRequest = () => ({ type: LOGOUT + "_" + REQUEST });
const boundLogoutSuccess = () => ({ type: LOGOUT + "_" + SUCCESS });
const boundLogoutFailure = error => ({ type: LOGOUT + "_" + FAILURE, payload: error});

export const logout = () => (dispatch) => {
    dispatch(boundLogoutRequest())
    return mainAxios
        .post("auth/logout/", { token: getRefreshToken() })
        .then(() => {
            removeToken();
            removeRefreshToken();
            removeCurrentUser();

            return dispatch(boundLogoutSuccess());
        })
        .catch(err => dispatch(boundLogoutFailure(checkResponseError(err))));
}

const boundSignupRequest = () => ({ type: SIGNUP + "_" + REQUEST });
const boundSignupSuccess = token => ({ type: SIGNUP + "_" + SUCCESS, payload: token.access, refresh_token: token.refresh });
const boundSignupFailure = error => ({ type: SIGNUP + "_" + FAILURE, payload: error });

export const signup = ({ username, password, first_name, last_name }) => (dispatch) => {
    dispatch(boundSignupRequest())
    return mainAxios.post("auth/register/", {
            username,
            password,
            first_name,
            last_name
        })
        .then((response) => {
            const token = response.data.token;
            setCurrentUser(response.data.user)

             if (token) {
                setToken(token.access);
                setRefreshToken(token.refresh);

                return dispatch(boundSignupSuccess(token));
            }
        })
        .catch(err => dispatch(boundSignupFailure(checkResponseError(err))));
};


export const authActions = {
    login,
    logout,
    signup
};