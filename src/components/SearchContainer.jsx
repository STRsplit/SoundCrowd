
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';

import SearchBar from './SearchBar.jsx';


class SearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      search: '',
    }
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  enterSearch(input){
    let currentSearch = input.target.value;
    this.setState({search: currentSearch})
  }

  searchSpotify() {
  let searchTerm = this.state.search
   let requestLocation = `/api/search/:${searchTerm}`;
    axios.get(requestLocation)
    .then((data) => {
      let songs = data.data;
      this.setState({songs: songs}, () => {
        console.log(this.state);
      })
    })
    .catch((error) => {
      console.log('ERRRROORRORORORROROR', error);
    })
  }
  render(){
    console.log(this.state.songs)
    const searchSongs = this.state.songs.map((song) =>
        <li>{song.name}</li>
    );
    return (
      <div> 
        <p onClick={() => this.handleSearch()}>HELLO</p>
        <SearchBar text={this.state.search} handleSearch={this.searchSpotify} handleChange={(e) => this.enterSearch(e)} />
        <ul>
         {searchSongs}
        </ul>
      </div>
    )
  }
}
export default SearchContainer;