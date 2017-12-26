import React from 'react'

import Filter from './Filter'
import SearchBar from './SearchBar'

class SearchMenu extends React.Component {
  render() {
    let { courses, cuisines, ratings, qs } = this.props;
    let { doFilter } = this.props;

    let filters = (
      <div className="row sidebar">
        <div className="col-sm-12 col-xs-4">
          <Filter title="course"
                  data={ courses || [] }
                  filter={ qs }
                  doFilter={ doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="cuisine"
                  data={ cuisines || [] }
                  filter={ qs }
                  doFilter={ doFilter }
          />
        </div>
        <div className="col-sm-12 col-xs-4">
          <Filter title="rating"
                data={ ratings || [] }
                filter={ qs }
                doFilter={ doFilter }
          />
        </div>
      </div>
    );

    return (
      <div className="row">
        <SearchBar format="col-xs-12" value={ qs.search } filter={ doFilter }/>
        <div className="col-xs-12">
          { filters }
        </div>
      </div>
    );
  }
}

export default SearchMenu;