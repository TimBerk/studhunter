import {REQUEST, FAILURE, SUCCESS, RESUME, LIST, ITEM, CREATE, UPDATE, DELETE} from "../constants/ActionTypes";
import { mainAxios, checkResponseError, bearerHeader } from "../utils/requests";
import { getRefreshToken } from "./userAction";


const boundResumeRequest = (currentType = RESUME) => ({ type: currentType + "_" + REQUEST });
const boundResumeFailure = error => ({ type: RESUME + "_" + FAILURE, payload: error });


const boundResumeListSuccess = data => ({ type: RESUME + "_" + LIST + "_" + SUCCESS, payload: data });
export const getResumeList = () => (dispatch) => {
    dispatch(boundResumeRequest())
    return mainAxios.get("/resume/", bearerHeader())
        .then((response) => {
            const data = response.data;

            if (data) {
                return dispatch(boundResumeListSuccess(data.results));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(getResumeList());
            }
            dispatch(boundResumeFailure(RESUME, checkResponseError(err)))
        });
};


const boundResumeItemSuccess = data => ({ type: RESUME + "_" + ITEM + "_" + SUCCESS, payload: data });
export const getResume = (id) => (dispatch) => {
    dispatch(boundResumeRequest());
    return mainAxios.get(`resume/${id}/`, bearerHeader())
        .then((response) => {
            const resume = response.data;

            if (resume) {
                return dispatch(boundResumeItemSuccess(resume));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(getResume(id));
            }
            dispatch(boundResumeFailure(RESUME, checkResponseError(err)))
        });
};


const boundResumeSuccess = data => ({ type: RESUME + "_" + CREATE + "_" + SUCCESS, payload: data });
export const createResume = (values) => (dispatch) => {
    dispatch(boundResumeRequest());
    return mainAxios.post("resume/", values, bearerHeader())
        .then((response) => {
            const resume = response.data;

            if (resume) {
                return dispatch(boundResumeSuccess(resume));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(createResume(values));
            }
            dispatch(boundResumeFailure(RESUME, checkResponseError(err)))
        });
};


const boundResumeUpdateSuccess = data => ({ type: RESUME + "_" + UPDATE + "_" + SUCCESS, payload: data });
export const updateResume = (id, values) => (dispatch) => {
    dispatch(boundResumeRequest());
    return mainAxios.patch(`resume/${id}/`, values, bearerHeader())
        .then((response) => {
            const resume = response.data;

            if (resume) {
                return dispatch(boundResumeUpdateSuccess(resume));
            }
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(updateResume(id, values));
            }
            dispatch(boundResumeFailure(RESUME, checkResponseError(err)))
        });
};


const boundResumeDeleteSuccess = () => ({ type: RESUME + "_" + DELETE + "_" + SUCCESS });
export const deleteResume = (id) => (dispatch) => {
    dispatch(boundResumeRequest());
    return mainAxios.delete(`resume/${id}/`, bearerHeader())
        .then(() => {
            dispatch(getResumeList());
            return dispatch(boundResumeDeleteSuccess());
        })
        .catch(err => {
            if(err.response !== undefined && err.response.data.code === 'token_not_valid') {
                dispatch(getRefreshToken());
                dispatch(deleteResume(id));
            }
            dispatch(boundResumeFailure(RESUME, checkResponseError(err)))
        });
};


export const resumeActions = {
    getResumeList,
    getResume,
    createResume,
    updateResume,
    deleteResume
};