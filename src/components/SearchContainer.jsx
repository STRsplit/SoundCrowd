
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import App from './App.jsx';
import keys from '../config/keys.js';
import axios from 'axios';
import $ from 'jquery';

import SearchBar from './SearchBar.jsx';

class SearchContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
      <p>HELLO</p>
      <SearchBar />
      </div>
    )
  }
}

export default SearchContainer;