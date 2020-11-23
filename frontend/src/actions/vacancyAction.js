import {REQUEST, FAILURE, SUCCESS, VACANCY, LIST, ITEM } from "../constants/ActionTypes";
import { mainAxios, checkResponseError, bearerHeader } from "../utils/requests";
import { getRefreshToken } from "./userAction";


const boundVacancyRequest = (currentType = VACANCY) => ({ type: currentType + "_" + REQUEST });
const boundVacancyFailure = error => ({ type: VACANCY + "_" + FAILURE, payload: error });


const boundVacancyListSuccess = data => ({ type: VACANCY + "_" + LIST + "_" + SUCCESS, payload: data });
export const getVacancyList = () => (dispatch) => {
    dispatch(boundVacancyRequest())
    return mainAxios.get("/vacancy/", bearerHeader())
        .then((response) => {
            const data = response.data;

            if (data) {
                return dispatch(boundVacancyListSuccess(data.results));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(getVacancyList());
            }
            dispatch(boundVacancyFailure(VACANCY, checkResponseError(err)))
        });
};


const boundVacancyItemSuccess = data => ({ type: VACANCY + "_" + ITEM + "_" + SUCCESS, payload: data });
export const getVacancy = (id) => (dispatch) => {
    dispatch(boundVacancyRequest());
    return mainAxios.get(`vacancy/${id}/`, bearerHeader())
        .then((response) => {
            const vacancy = response.data;

            if (vacancy) {
                return dispatch(boundVacancyItemSuccess(vacancy));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(getVacancy(id));
            }
            dispatch(boundVacancyFailure(VACANCY, checkResponseError(err)))
        });
};


export const vacancyActions = {
    getVacancyList,
    getVacancy
};