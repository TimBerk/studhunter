import moment from "moment";

export const isEmpty = obj => (typeof obj) === 'object' && obj !== null ? (Object.keys(obj).length === 0) : false;
export const getRandomInt = max => Math.floor(Math.random() * (max - 1)) + 1;
export const formatDate = momentDate =>  moment(momentDate).format("DD-MM-YYYY");