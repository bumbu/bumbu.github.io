import React, { Component } from 'react';
import ListingHeader from './ListingHeader'
import ListingItems from './ListingItems'

export default class SidebarListing extends Component {
  render() {
    return (
      <div>
        <ListingHeader />
        <ListingItems />
      </div>
    );
  }
}
