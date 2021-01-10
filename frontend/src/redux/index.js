import { combineReducers } from "redux";
import courseReducer from "./course"
import userReducer from "./user"

export default combineReducers({ courseReducer, userReducer});