import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_CATEGORY,
} from '../actions/types';

const initialState = {
  category: [],
  selectedCategory: {},
  courseSelected: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return { ...state, category: action.payload};
    default: return state;
  }
};




export function fetchAllCategory () {
  return async (dispatch, getState) => {
    dispatch({ type: SET_COURSE_LOADING, payload: true });
      try {
         
          dispatch({
              type: FETCH_COURSE_MOST_VIEWED,
              payload: null
          });
          
      } catch(error){
        handleError(error, dispatch);
      } finally {
        dispatch({ type: SET_COURSE_LOADING, payload: false });
      }
  }   
}


export default categoryReducer;