import SearchConstants from '../constants/SearchConstants'

function search(state = { recipes: {} }, action) {
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOAD:
      if (action.res) {
        let newSearch = {};
        newSearch[action.qs] = {
          recipes: action.res.results,
          totalRecipes: action.res.count
        };

        return {
          ...state,
          ...newSearch
        };
      }
      return state;
    default:
      return state;
  }
}

export default search
