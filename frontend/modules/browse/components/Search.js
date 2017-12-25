import React from 'react'
import classNames from 'classnames';
import SmoothCollapse from 'react-smooth-collapse';
import Spinner from 'react-spinkit';
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import Filter from './Filter'
import SearchBar from './SearchBar'
import ListRecipes from './ListRecipes'
import Pagination from './Pagination'

require("./../css/browse.scss");

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_mobile_filters: false,
    };
  }

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

  toggleMobileFilters = () =>  {
    this.setState({show_mobile_filters: !this.state.show_mobile_filters});
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
    let { filterActions, searchActions } = this.props;

    let header = (
      <span>
        Show Filters
        <span className="glyphicon glyphicon-chevron-down pull-right"/>
      </span>
    );
    if (this.state.show_mobile_filters) {
      header = (
        <span>
          Hide Filters
          <span className="glyphicon glyphicon-chevron-up pull-right"/>
        </span>
      );
    }

    let filters = (
      <div className={ classNames(
          "row",
          "sidebar",
        ) }>
        <div className="col-sm-12 col-xs-4">
          <Filter title="course"
                  data={ courses || [] }
                  filter={ qs }
                  doFilter={ this.doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="cuisine"
                  data={ cuisines || [] }
                  filter={ qs }
                  doFilter={ this.doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="rating"
                data={ ratings || [] }
                filter={ qs }
                doFilter={ this.doFilter }
          />
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-xs-12">
            <div className="hidden-xs">
              { filters }
            </div>

            <div className="visible-xs sidebar-header" onClick={ this.toggleMobileFilters }>
              { header }
            </div>
            <div className="visible-xs">
              <SmoothCollapse
                expanded={this.state.show_mobile_filters}
                heightTransition=".5s ease">
                { filters }
              </SmoothCollapse>
            </div>
          </div>
          <div className="col-sm-10 col-xs-12">
            <div className="row">
              <SearchBar format="col-xs-12" value={ qs.search } filter={ this.doFilter }/>
            </div>
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