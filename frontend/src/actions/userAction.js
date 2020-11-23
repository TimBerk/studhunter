import {REQUEST, FAILURE, SUCCESS, USER, REFRESH, TOKEN} from "../constants/ActionTypes";
import {mainAxios, bearerHeader, checkResponseError, refreshHeader} from "../utils/requests";

import {
    setCurrentUser,
    setToken
} from "../utils/storages";


const boundUserRequest = type => ({ type: type + "_" + REQUEST });
const boundUserFailure = (type, error) => ({ type: type + "_" + FAILURE, payload: error });


const boundRefreshTokenSuccess = user => ({ type: REFRESH + "_" + TOKEN + "_" + SUCCESS, payload: user });


export const getRefreshToken = () => dispatch => {
    const type = REFRESH + "_" + TOKEN;

    dispatch(boundUserRequest(type));
    mainAxios.post(`auth/jwt/refresh/`,  refreshHeader())
    .then(response => {
        setToken(response.data.access);
        return dispatch(boundRefreshTokenSuccess(response.data.access));
    })
    .catch(err => dispatch(boundUserFailure(type, checkResponseError(err))));
}


const boundUserDataSuccess = user => ({ type: USER + "_" + SUCCESS, payload: user });

export const getUserData = () => (dispatch) => {
    dispatch(boundUserRequest(USER))
    return mainAxios.get("auth/user/", bearerHeader())
        .then((response) => {
            setCurrentUser(response.data);
            return dispatch(boundUserDataSuccess(response.data));
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(boundUserRequest(USER))
                dispatch(getRefreshToken());
                dispatch(getUserData());
            }
            dispatch(boundUserFailure(USER, checkResponseError(err)))
        });
};


export const setUserData = (values) => (dispatch) => {
    dispatch(boundUserRequest(USER))

    return mainAxios.patch("auth/user/", values, bearerHeader())
        .then((response) => {
            setCurrentUser(response.data);
            return dispatch(boundUserDataSuccess(response.data));
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(boundUserRequest(USER))
                dispatch(getRefreshToken());
                dispatch(setUserData(values));
            }
            dispatch(boundUserFailure(USER, checkResponseError(err)))
        });
};


export const userActions = {
    getUserData,
    setUserData
};