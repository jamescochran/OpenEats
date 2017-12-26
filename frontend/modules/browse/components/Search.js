import React from 'react'
import Spinner from 'react-spinkit';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import ListRecipes from './ListRecipes'
import Pagination from './Pagination'
import SearchMenu from './SearchMenu'

require("./../css/browse.scss");

class Search extends React.Component {
  doFilter = (name, value) => {
    // Get a deep copy of the filter state
    let filters = JSON.parse(JSON.stringify(this.props.qs));
    if (value !== "") {
      filters[name] = value;
    } else {
      delete filters[name];
    }

    if (name !== "offset") {
      filters['offset'] = 0;
    }

    this.props.updateURL(filters)
  };

  render() {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      no_results: {
        id: 'browse.no_results',
        description: 'No results header',
        defaultMessage: 'Sorry, there are no results for your search.',
      }
    });

    let { search, courses, cuisines, ratings, qs } = this.props;

    return (
      <div className="container">
        <SearchMenu
          courses={ courses }
          cuisines={ cuisines }
          ratings={ ratings }
          qs={ qs }
          doFilter={ this.doFilter }
        />
        <div className="row">
          <div className="col-xs-12">
            <div id="browse" className="row">
              {
                search.recipes === undefined || search.recipes.length == 0 ?
                  <div className="spinner">
                    <h3 className="no-results">{ formatMessage(messages.no_results) }</h3>
                    <Spinner className="spinner-obj" spinnerName="circle" noFadeIn />
                  </div>
                :
                  <ListRecipes
                    format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    data={ search.recipes }
                  />
              }
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pagination limit={ qs.limit }
                            count={ search.totalRecipes }
                            offset={ qs.offset }
                            filter={ this.doFilter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Search);