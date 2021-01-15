import { combineReducers } from "redux";
import courseReducer from "./course"
import userReducer from "./user"
import categoryReducer from "./category"
export default combineReducers({ courseReducer, userReducer,categoryReducer});