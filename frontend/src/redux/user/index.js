import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_USERS,
  SET_LOADING,
} from '../actions/types';

const initialState = {
    users: [],
    isLoading: false,
};
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload};
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
          console.log("Server Response:")
          console.log(res.data)
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

export default userReducer;