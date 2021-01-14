import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_SELECT,
  FETCH_COURSE_MOST_VIEWED,
  FETCH_COURSE_WEEK_HIGHLIGHT,
  FETCH_COURSE_LATEST,
  SET_COURSE_LOADING,
  FETCH_SEARCH_RESULTS,
  SET_COURSE_SUBBED,
  SET_COURSE_WATCHED,
  SET_COURSE_OWNED,
} from '../actions/types';

  const initialState = {
    courses: [],
    courseSelected: {
      _id:'',
      thumbnail:'',
      title:'',
      briefDes:'',
      fullDes: '',
      rating: 0,
      rateCount: 0,
      subCount: 0,
      price: 0,
      bonus: 0,
      syllabus: [],
      status: '',
      views: 0,
      createdAt:'',
      updatedAt:'',
      lecturer:{},
    },
    mostViewed:[],
    weekHighlight: [],
    latest: [],
    searchResults: [],
    isSubbed: false,
    isWatched: false,
    isMine: false,
    isLoading: false,
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COURSES:
        return { ...state, courses: action.payload};
      case FETCH_COURSE:
        return { ...state, course: action.payload,};
      case FETCH_COURSE_SELECT:
        return { ...state, courseSelected: action.payload };
      case FETCH_COURSE_MOST_VIEWED:
        return { ...state, mostViewed: action.payload};
      case FETCH_COURSE_WEEK_HIGHLIGHT:
        return {...state, weekHighlight: action.payload};
      case FETCH_COURSE_LATEST:
        return {...state, latest: action.payload};
      case FETCH_SEARCH_RESULTS:
        return {...state, searchResults: action.payload};
      case SET_COURSE_LOADING:
        return { ...state, isLoading: action.payload };
      case SET_COURSE_SUBBED:
        return {...state, isSubbed: action.payload};
      case SET_COURSE_WATCHED:
        return {...state, isWatched: action.payload};
      case SET_COURSE_OWNED:
        return {...state, isMine: action.payload}
      default: return state;
    }
  };

export function fetchMostViewed () {
  return async (dispatch, getState) => {
    // dispatch({ type: SET_COURSE_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/courses/most-viewed");
          let mostViewed = []
          for(var i in res.data){
              var data = res.data[i];
              mostViewed.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, syllabus: data.syllabus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_COURSE_MOST_VIEWED,
              payload: mostViewed
          });
      } catch(error){
        handleError(error, dispatch);
      } 
      // finally {
      //   dispatch({ type: SET_COURSE_LOADING, payload: false });
      // }
  }   
}

export function fetchHighLight () {
  return async (dispatch, getState) => {
      try {
          const res = await Axios.get("http://localhost:8080/courses/highlight-this-week");
          let highLight = []
          for(var i in res.data){
              var data = res.data[i];
              highLight.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_COURSE_WEEK_HIGHLIGHT,
              payload: highLight
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function fetchLatest () {
  return async (dispatch, getState) => {
      try {
          const res = await Axios.get("http://localhost:8080/courses/latest");
          let latest = []
          for(var i in res.data){
              var data = res.data[i];
              latest.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_COURSE_LATEST,
              payload: latest
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function fetchSearchResults (seachText) {
  return async (dispatch, getState) => {
      try {
          const res = await Axios.get("http://localhost:8080/courses/catsearch?searchtext=" + seachText);
          let results = []
          for(var i in res.data){
              var data = res.data[i];
              results.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          dispatch({
              type: FETCH_SEARCH_RESULTS,
              payload: results
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function fetchAllCourse () {
  return async (dispatch, getState) => {
    dispatch({ type: SET_COURSE_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/courses/get-courses-list");
          let courses = []
          for(var i in res.data){
              var data = res.data[i];
              courses.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          
          dispatch({
              type: FETCH_COURSES,
              payload: courses
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_COURSE_LOADING, payload: false });
      }
  }   
}

export function fetchCourseSeleccted (id) {
  return async (dispatch, getState) => {
    dispatch({ type: SET_COURSE_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/courses/" + id);
          const course = res.data;
          if(course) {
            course.lecturer = await Axios.get("http://localhost:8080/users/" + course.lecturer);
          }
          dispatch({
              type: FETCH_COURSE_SELECT,
              payload: course
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_COURSE_LOADING, payload: false });
      }
  }   
}

export function checkIsSubbed (userID, courseID) {
  return async (dispatch, getState) => {
      try {
          let isSubbed = false;
          await Axios.get("http://localhost:8080/student/check-subbed?userid=" + userID + "&courseid=" + courseID).then((res) => {
            if(res.data) {
              isSubbed = true;
              
            }
            console.log(res.data)
          });
          
          dispatch({
              type: SET_COURSE_SUBBED,
              payload:isSubbed
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function checkIsWatched (userID, courseID) {
  return async (dispatch, getState) => {
      try {
          let isWatched = false;
          await Axios.get("http://localhost:8080/student/check-watched?userid=" + userID + "&courseid=" + courseID).then((res) => {
            if(res.data) {
              isWatched = true;
            } 
          });
          
          dispatch({
              type: SET_COURSE_WATCHED,
              payload: isWatched
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function checkMyCourse (userID, courseID) {
  return async (dispatch, getState) => {
      try {
          let isMine = false;
          await Axios.get("http://localhost:8080/student/check-my-course?userid=" + userID + "&courseid=" + courseID).then((res) => {
            if(res.data) {
              isMine = true;
            }
          });
          
          dispatch({
              type: SET_COURSE_OWNED,
              payload: isMine
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function addWatchList (userID, courseID) {
  return async (dispatch, getState) => {
      try {
          var action = "watchlist"
          var isWatched = false;
          const watchlistData = ({userID, courseID, action })
          Axios.post("http://localhost:8080/student/add-to-watchlist", watchlistData).then((res) => {
            isWatched = true;
          });
          
          dispatch({
              type: SET_COURSE_WATCHED,
              payload: isWatched
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export function subscribeToCourse (userID, courseID) {
  return async (dispatch, getState) => {
      try {
          var action = "subscribed"
          var isSubbed = false;
          const watchlistData = ({userID, courseID, action })
          Axios.post("http://localhost:8080/student/subscibe", watchlistData).then((res) => {
            isSubbed = true  
          });
          
          dispatch({
              type: SET_COURSE_SUBBED,
              payload: isSubbed
          });
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}

export default courseReducer;