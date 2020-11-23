import {REQUEST, FAILURE, SUCCESS, USER, REFRESH, TOKEN} from "../constants/ActionTypes";

const initialState = {
    user: null,
    refresh_token: null,
    isLoading: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case USER + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case USER + "_" + SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            };
        case USER + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case REFRESH + "_" + TOKEN + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case  REFRESH + "_" + TOKEN + "_" + SUCCESS:
            return {
                ...state,
                refresh_token: action.payload,
                isLoading: false
            };
        case  REFRESH + "_" + TOKEN + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state
    }
}