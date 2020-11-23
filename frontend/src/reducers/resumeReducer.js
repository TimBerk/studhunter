import {REQUEST, FAILURE, SUCCESS, RESUME, LIST, ITEM, CREATE, UPDATE, VIEW, DELETE} from "../constants/ActionTypes";

const initialState = {
    list: [],
    item: null,
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case RESUME + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case RESUME + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case RESUME + "_" + LIST +"_" + SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoading: false
            };
        case RESUME + "_" + ITEM +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };
        case RESUME + "_" + CREATE +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };
        case RESUME + "_" + UPDATE +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };
        case RESUME + "_" + VIEW +"_" + SUCCESS:
            return {
                ...state,
                item: action.payload,
                isLoading: false
            };
        case RESUME + "_" + DELETE +"_" + SUCCESS:
            return {
                ...state,
                isLoading: false
            };

        default:
            return state
    }
}