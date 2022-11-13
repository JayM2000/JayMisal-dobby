import { combineReducers } from "redux";
import auth from './auth';
import imgall from './mainfll';

export default combineReducers({
    auth,imgall
});