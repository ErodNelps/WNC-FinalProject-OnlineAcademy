import { SET_CURRENT_COURSE } from "../actions/types";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_COURSE:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      default:
        return state;
    }
  }