import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import _ from 'lodash';
import axios from 'axios';
import $ from 'jquery';

import SongGenreSection from './SearchCriteria.jsx'
import SongEntry from './SongEntry.jsx';
import SearchBar from './SearchBar.jsx';




class SearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      search: '',
      filter: 'track',
      dataSource: []
    }
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.autoCompleteSearchSpotify = this.autoCompleteSearchSpotify.bind(this);
  }
  handleSongAdd(e) {

  }

  componentDidUpdate() {
    console.log(this.state);
  }

  enterSearch(input){
    let search = input.target === undefined ? input : input.target.value;
    this.setState({search}, this.autoCompleteSearchSpotify) 
    
  }
  setSelected(event){
    const filter = event.target.value
    this.setState({ filter })
  }

  addSongToPlaylist(event) {
    event.preventDefault()
    this.setState({songs: [], search: '', filter: 'track'})
  }

  searchSpotify() {
    const { search, filter } = this.state
    
    axios.get('/api/search/', { 
      params: {
        name: search,
        filter: filter
      }
    })
    .then((data) => {
      let songs = data.data;
      this.setState({songs: songs, search: ''})
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  autoCompleteSearchSpotify() {
    let { search, filter } = this.state
    axios.get(`https://api.spotify.com/v1/search?q="${search}"&type=${filter}`)
    .then((data) => {
      let songs = data.data.tracks.items;
      console.log(songs)
      this.setState({dataSource: songs})
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  render(){
    console.log(this.state.songs)
    const searchSongs = this.state.songs.map((song, idx) => (
        <div>
          <SongEntry songInfo={song} addSong={(e) => this.addSongToPlaylist(e)} images={song.album.images}/>
        </div>
    ));
    return (
      <div className="searchcontainer-container">
        <p onClick={() => this.handleSearch()}>HELLO</p>
        <SearchBar stats={this.state} text={this.state.search} 
        selectedOption={this.state.filter} 
        handleSelect={(e) => this.setSelected(e)} 
        handleSearch={this.searchSpotify} 
        handleChange={(e) => this.enterSearch(e)} />
        <div>
         <SongGenreSection songs={this.state.songs} />
        </div>
      </div>
    )
  }
}
export default SearchContainer;