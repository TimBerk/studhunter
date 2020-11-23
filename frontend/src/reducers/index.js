import { combineReducers } from "redux";
import auth from './authReducer';
import user from './userReducer';
import resume from './resumeReducer';
import dictionary from './dictionaryReducer';
import vacancy from './vacancyReducer';

export default combineReducers({
    auth,
    user,
    resume,
    dictionary,
    vacancy
});