import { combineReducers } from 'redux'
import { createStore } from 'redux';

import { default as filters } from './FilterReducer'
import { default as search } from './SearchReducer'

import SearchConstants from '../constants/SearchConstants'
import FilterConstants from '../constants/FilterConstants'

// const browse = combineReducers({
//   search,
//   filters,
// });

// function browse(state = {}, action) {
//   console.log(action)
//   return {
//     search: search(state.search, action),
//     filters: filters(state.filters, action)
//   };
// }

function browse(state = 0, action) {
  if (state === 0) {
    return {
      search: search(undefined, action),
      filters: filters(undefined, action)
    };
  }

  console.log(action);
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOAD:
      console.log(state);
      return { ...state, search: search(state.search, action)};
    case FilterConstants.BROWSE_FILTER_LOAD:
      console.log(state);
      return { ...state, filters: filters(state.filters, action)};
    default:
      return state;
  }
}

export default browse
