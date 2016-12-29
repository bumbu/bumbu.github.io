import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ListingSearch from './ListingSearch'

@inject('sidebar')
@observer
export default class ListingHeader extends Component {
  render() {
    const { showSearch, activeCategoryName } = this.props.sidebar

    return (
      <div className="listing__header">
        {!showSearch ? <h1>{activeCategoryName}</h1> : null}
        {showSearch ? <ListingSearch /> : null}
      </div>
    );
  }
}
