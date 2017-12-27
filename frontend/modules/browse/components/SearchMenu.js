import React from 'react'
import history from '../../common/history'

import Filter from './Filter'
import SearchBar from './SearchBar'

class SearchMenu extends React.Component {
  reset = () => (
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-default"
        onClick={ a => history.push('/browse') }
      >
        Reset
      </button>
    </div>
  );

  showReset = () => {
    // Create arrays of property names
    let qs = Object.getOwnPropertyNames(this.props.qs);
    let defaults = Object.getOwnPropertyNames(this.props.defaults);

    // If number of properties is different,
    // objects are not equivalent
    if (qs.length != defaults.length) {
      return false;
    }

    for (let i = 0; i < qs.length; i++) {
      let propName = qs[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (this.props.qs[propName] != this.props.defaults[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  };

  render() {
    let { courses, cuisines, ratings, qs, count } = this.props;
    let { doFilter } = this.props;
    console.log(qs);

    return (
      <div className="row search-menu">
        <SearchBar format="col-xs-12" value={ qs.search } filter={ doFilter }/>
        <div className="col-xs-12">
          <Filter
            title="course"
            data={ courses || [] }
            filter={ qs }
            doFilter={ doFilter }
          />
          <Filter
            title="cuisine"
            data={ cuisines || [] }
            filter={ qs }
            doFilter={ doFilter }
          />
          <Filter
            title="rating"
            data={ ratings || [] }
            filter={ qs }
            doFilter={ doFilter }
          />
          <Filter
            title="limit"
            data={[
              {id: 1, total: 3, title: "2", slug: "2"},
              {id: 2, total: 3, title: "6", slug: "6"},
              {id: 3, total: 3, title: "12", slug: "12"},
            ]}
            filter={ qs }
            doFilter={ doFilter }
          />
          { !this.showReset() ? this.reset() : '' }
          <div className="page-count">
            { count } recipes
          </div>
        </div>
      </div>
    );
  }
}

export default SearchMenu;