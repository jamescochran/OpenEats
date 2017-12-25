import SearchConstants from '../constants/SearchConstants'

function search(state = { recipes: [], totalRecipes: 0 }, action) {
  switch (action.type) {
    case SearchConstants.BROWSE_SEARCH_LOAD:
      return {
        recipes: action.res.results,
        totalRecipes: action.res.count
      };
    default:
      return state;
  }
}

export default search
