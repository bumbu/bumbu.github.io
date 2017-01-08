import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('sidebar')
@observer
export default class ListingHeader extends Component {
  render() {
    const { searchTerm } = this.props.sidebar

    return (
      <form className="listing__form" action="#">
        <input
          autoFocus
          type="text"
          className="listing__form-input"
          value={searchTerm}
          onChange={(ev) => this.onChange(ev.target.value)}
          />
        <button type="submit" className="listing__form-button"></button>
      </form>
    )
  }

  onChange(value) {
    this.props.sidebar.searchTerm = value
  }
}
