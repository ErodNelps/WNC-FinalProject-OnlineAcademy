import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_COURSES,
  FETCH_COURSE,
  FETCH_COURSE_SELECT,
  FETCH_COURSE_MOST_VIEWED,
  SET_COURSE_LOADING,
  DEFAULT,
} from '../actions/types';

  const initialState = {
    courses: [],
    course: {},
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
      lecturer:'',
    },
    mostViewed:[],
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
      case SET_COURSE_LOADING:
        return { ...state, isLoading: action.payload };
      default: return state;
    }
  };
  // export const fetchProducts = () => {
//     try {
//         const res = await Axios.get('http:/localhost:3000/courses/');
//         dispatch({
//             type: FETCH_COURSES,
//             payload: res.data
//         });
//     } catch (error) {
//         handleError(error, dispatch);
//     }
// };

// export const fetchCourseSeleccted = () => {
//     try {
//         const res = await Axios.get('http:/localhost:3000/courses/select');
//         dispatch({
//             type: FETCH_COURSE_SELECT,
//             payload: res.data
//         });
//     } catch (error) {
//         handleError(error, dispatch);
//     }
// };

// export const fetchProducts = () => {
//   return async (dispatch, getState) => {
//     dispatch({ type: SET_COURSE_LOADING, payload: true });
//       try {
//           const res = await Axios.get('http:/localhost:3000/courses/');
//           dispatch({
//               type: FETCH_COURSES,
//               payload: res.data
//           });
//       } catch (error) {
//           handleError(error, dispatch);
//       } finally {
//         dispatch({ type: SET_COURSE_LOADING, payload: false });
//       }
//   };
// };

export function fetchMostViewed () {
  return async (dispatch, getState) => {
    dispatch({ type: SET_COURSE_LOADING, payload: true });
      try {
          const res = await Axios.get("http://localhost:8080/courses/most-viewed");
          let mostViewed = []
          for(var i in res.data){
              var data = res.data[i];
              mostViewed.push({_id: data._id, thumbnail: data.thumbnail, title: data.title, briefDes : data.briefDes, fullDes : data.fullDes, 
                  rating : data.rating, rateCount: data.rateCount,subCount: data.subCount, price: data.price,
                  bonus: data.bonus, syllabus: data.syllabus, status: data.status, views: data.views, createdAt: data.createdAt, updatedAt: data.updatedAt})
          }
          console.log("Server Response:")
          console.log(mostViewed)
          dispatch({
              type: FETCH_COURSE_MOST_VIEWED,
              payload: mostViewed
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
          console.log("Server Response:")
          console.log(res.data)
          dispatch({
              type: FETCH_COURSE_SELECT,
              payload: res.data
          });
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_COURSE_LOADING, payload: false });
      }
  }   
}


export default courseReducer;