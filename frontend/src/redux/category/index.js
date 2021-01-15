import Axios from 'axios'
import handleError from '../../utils/errorHandler'

import {
  FETCH_CATEGORY,
} from '../actions/types';

const initialState = {
  categories: [],
  selectedCategory: {},
  courseSelected: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return { ...state, categories: action.payload};
    default: return state;
  }
};


export function fetchAllCategory () {
  return async (dispatch, getState) => {
      try {
        const res = await Axios.get("http://localhost:8080/category/get-all-category");
        let categories = []
        for(var i in res.data){
            var data = res.data[i];
            var subRes = await Axios.get("http://localhost:8080/subcategory/get-subcategory/" + data._id);
            var sub =[];
            for(var j in subRes.data){
              var subdata = subRes.data[j];
              sub.push({name: subdata.name});
            }
            categories.push({_id: data._id, category: data.category, subCategories: sub});
        }
        dispatch({
            type: FETCH_CATEGORY,
            payload: categories
        });
          
      } catch(error){
        handleError(error, dispatch);
      }
  }   
}


export default categoryReducer;