import axios from "axios";
import {getRefreshToken, getToken} from "./storages";

export const checkResponseError = error => error.response !== undefined ? error.response.statusText: 'error';

export const BASE_URL = 'http://localhost:8000/';

export const mainAxios = axios.create({
    baseURL: BASE_URL,
});

export const dictAxios = axios.create({
    baseURL: BASE_URL + 'dictionaries/',
});

export const csrfAxios = (csrfToken) => {
    return axios.create({
        baseURL: BASE_URL,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName :"csrftoken",
        withCredentials: true,
        headers: {
            "X-CSRFToken": csrfToken,
        }
    });
}

export async function searchDictionaryData(dict_type, search) {
    if (search.length >= 2) {
        const response = await dictAxios.get(dict_type + '?search=' + search)
        const data = response.data.results;
        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        }))

        return options
    }

    return [];
}

export const bearerHeader = () => {
    const token = getToken();
    return token ? { headers: { Authorization: ` Bearer ${token}` } } : {};
};

export const refreshHeader = () => {
    const token = getRefreshToken();
    return token ? { refresh: token } : {};
};