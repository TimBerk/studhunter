import {REQUEST, FAILURE, SUCCESS, LOGIN, LOGOUT, SIGNUP} from "../constants/ActionTypes";

const initialState = {
    token: null,
    refresh_token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case LOGIN + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN + "_" + SUCCESS:
            return {
                ...state,
                token: action.payload,
                refresh_token: action.refresh_token,
                isLoggedIn: true,
                isLoading: false
            };
        case LOGIN + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case LOGOUT + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case LOGOUT + "_" + SUCCESS:
            return {
                ...state,
                token: null,
                refresh_token: null,
                isLoggedIn: false,
                isLoading: false
            };
        case LOGOUT + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case SIGNUP + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case SIGNUP + "_" + SUCCESS:
            return {
                ...state,
                token: action.payload,
                refresh_token: action.refresh_token,
                isLoggedIn: true,
                isLoading: false
            };
        case SIGNUP + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state
    }
}