import SearchConstants from '../constants/SearchConstants'

function search(state = [], action) {
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOAD:
      return action.res.results;
    default:
      return state;
  }
}

export default search
