import {REQUEST, FAILURE, SUCCESS, VACANCY, LIST, ITEM, VIEW } from "../constants/ActionTypes";

const initialState = {
    list: [],
    item: null,
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case VACANCY + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case VACANCY + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case VACANCY + "_" + LIST +"_" + SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false
            };
        case VACANCY + "_" + ITEM +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };
        case VACANCY + "_" + VIEW +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };

        default:
            return state
    }
}