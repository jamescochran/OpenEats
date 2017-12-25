import SearchConstants from '../constants/SearchConstants'
import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'

export const loadRecipes = (filter) => {
  return dispatch => {
    // dispatch({ actionType: 'REQUEST_LOAD_RECIPES' });

    request()
      .get(serverURLs.browse)
      .query(filter)
      .then(res => (
        dispatch({
          type: SearchConstants.BROWSE_SEARCH_LOAD,
          res: res.body
        })
      ));
  }
};
