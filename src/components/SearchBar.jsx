import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event){
    event.preventDefault();
    this.props.handleSearch();
  }
  render() {
    const { text, handleChange, handleSearch } = this.props
    return (
      <div>
        <form>
          <input type="text/css" default="search for a song" onChange={handleChange} value={text}></input>
          <button onClick={this.handleClick} />
          </form>
      </div>
    )
  }
}

export default SearchBar;