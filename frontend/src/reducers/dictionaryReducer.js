import { REQUEST, FAILURE, SUCCESS, DICT, EMPLOYMENT, SCHEDULE, SALARY, SCOPE, EXPERIENCE, EDUCATION, DIRECTION, SKILL } from "../constants/ActionTypes";

const initialState = {
    employment: [],
    schedule: [],
    salary: [],
    scope: [],
    qualification: [],
    experience: [],
    education: [],
    direction: [],
    skills: [],
    isLoading: false,
    error: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case DICT + "_" + REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case DICT + "_" + FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DICT + "_" + EMPLOYMENT + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                employment: action.payload
            };
        case DICT + "_" + SCHEDULE + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                schedule: action.payload
            };
        case DICT + "_" + SALARY + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                salary: action.payload
            };
        case DICT + "_" + SCOPE + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                scope: action.payload
            };
        case DICT + "_" + EXPERIENCE + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                experience: action.payload
            };
        case DICT + "_" + EDUCATION + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                education: action.payload
            };
        case DICT + "_" + DIRECTION + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                direction: action.payload
            };
        case DICT + "_" + SKILL + "_" + SUCCESS:
            return {
                ...state,
                isLoading: false,
                skills: action.payload
            };

        default:
            return state
    }
}