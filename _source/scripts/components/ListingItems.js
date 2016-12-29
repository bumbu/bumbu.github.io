import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx'
import ListingItem from './ListingItem'
import ListingEmpty from './ListingEmpty'

@inject('sidebar')
@observer
export default class SidebarListing extends Component {
  render() {
    const { visiblePosts, activePost } = this.props.sidebar

    return (
      <div className="listing__items">
        {visiblePosts.map(post => (
          <ListingItem post={post} key={post.id} isActive={post.id === activePost}/>
        ))}
        {visiblePosts.length ? null : <ListingEmpty />}
      </div>
    );
  }
}
