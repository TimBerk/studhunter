import {REQUEST, FAILURE, SUCCESS, DICT } from "../constants/ActionTypes";
import { dictAxios, checkResponseError } from "../utils/requests";
import { getDictionaryType } from "../constants/DictionaryTypes";

const boundDictRequest = () => ({ type: DICT + "_" + REQUEST });
const boundDictSuccess = (data, currentType) => ({ type: DICT + "_" + currentType + "_" + SUCCESS, payload: data });
const boundDictFailure = error => ({ type: DICT + "_" + FAILURE, payload: error });

export const getDictionaryData = dictType => (dispatch) => {
    const typeReducer = getDictionaryType(dictType);
    dispatch(boundDictRequest());
    return dictAxios.get(dictType)
        .then((response) => {
            const data = response.data;
            let options = [];
            if (dictType === 'direction') {
                options = data.map(d => ({
                    "value": d.id,
                    "label": d.code + " " + d.name
                }));
            } else {
                options  = data.results.map(d => ({
                    "value": d.id,
                    "label": d.name
                }))
            }

            if (options) {
                return dispatch(boundDictSuccess(options, typeReducer));
            }
        })
        .catch(err => dispatch(boundDictFailure(checkResponseError(err))));
};


export const dictActions = {
    getDictData: getDictionaryData
};