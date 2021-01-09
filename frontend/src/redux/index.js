import { combineReducers } from "redux";
import courseReducer from "./course"
import {DEFAULT} from './actions/types'

export default combineReducers({ courseReducer, });