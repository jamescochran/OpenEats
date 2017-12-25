import SearchConstants from '../constants/SearchConstants'
import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const loadRecipes = (filter) => {
  return dispatch => {
    // dispatch({ actionType: 'REQUEST_LOAD_RECIPES' });

    const map = {
      'cuisine': 'cuisine__slug',
      'course': 'course__slug'
    };

    let parsed_filter = {};
    for (let f in filter) {
      if (filter[f] !== null) {
        parsed_filter[f in map ? map[f] : f] = filter[f];
      }
    }

    request()
      .get(serverURLs.browse)
      .query(parsed_filter)
      .then(res => (
        dispatch({
          type: SearchConstants.BROWSE_SEARCH_LOAD,
          res: res.body
        })
      ));
  }
};
