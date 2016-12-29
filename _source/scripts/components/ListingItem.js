import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class ListingItem extends Component {
  render() {
    const { post, isActive } = this.props
    const className = !isActive ? 'listing__item' : 'listing__item listing__item--active'

    return (
      <a className={className} href={post.url}>
        {post.title}
      </a>
    );
  }
}
