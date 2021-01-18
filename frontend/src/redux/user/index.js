import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_USERS,
  FETCH_WATCHLIST,
  FETCH_LECTURER_COURSES,
  FETCH_SUBSCRIPTION,
  SET_LOADING,

} from '../actions/types';

const initialState = {
    users: [],
    isLoading: false,
    watchlist: [],
    subList: [],
    lecturerCourse:[],
};
  
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload};
    case FETCH_WATCHLIST:
      return {...state, watchList: action.payload};
    case FETCH_SUBSCRIPTION:
      return {...state, subList: action.payload};
    case FETCH_LECTURER_COURSES:
      return {...state, lecturerCourse: action.payload}
    case SET_LOADING:
      return { ...state, isLoading: action.payload};
    default: return state;
  }
};

export function fetchAllUser () {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/users/get-users-list");
          let users = []
          for(var i in res.data){
              var data = res.data[i];
              users.push({_id: data._id, firstName: data.firstName, lastName: data.lastName, email:data.email, role: data.role})
          }
          // console.log("Server Response:")
          // console.log(res.data)
          dispatch({
              type: FETCH_USERS,
              payload: res.data
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
  }   
}

export function fetchStudentWatchlist (id) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/student/"+ id +"/get-student-watchlist");
          let courses = []
          for(var i in res.data){
              var data = res.data[i];
              courses.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_WATCHLIST,
              payload: courses
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
  }   
}

export function fetchStudentSubList (id) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/student/"+ id +"/get-student-subscription");
          let courses = []
          for(var i in res.data){
              var data = res.data[i];
              courses.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_SUBSCRIPTION,
              payload: courses
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
  }   
}

export function fetchLecturerCourse (id) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/student/"+ id +"/get-lecturer-course");
          let courses = []
          for(var i in res.data){
              var data = res.data[i];
              courses.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_LECTURER_COURSES,
              payload: courses
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
  }   
}

export default userReducer;