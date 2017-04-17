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
import AccordionTest from './AccordionTest.jsx';




class SearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      search: '',
      filter: 'track',
      dataSource: []
    }

    this.handleSongAdd = this.handleSongAdd.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.autoCompleteSearchSpotify = this.autoCompleteSearchSpotify.bind(this);
  }


  enterSearch(input){
    let search = input.target === undefined ? input : input.target.value;
    this.setState({search}, this.autoCompleteSearchSpotify) 
    
  }
  setSelected(event){
    const filter = event.target.value
    this.setState({ filter })
  }

  handleSongAdd(e) {
    const { playlist } = this.props.stats
    const { dataSource } = this.state
    console.log(dataSource, e.target.value)
    let targetSong = dataSource.filter(song => {
      if(e.target.value === song.id){
        return song;
      }
    })[0];
    
    targetSong.artist = targetSong.artist ? targetSong.artist[0].name : targetSong.artists[0].name
    let trackInfo = {
      song_id: targetSong.id,
      artist: targetSong.artist,
      title: targetSong.name,
      playlist_id: playlist
    }
    console.log(trackInfo)
    axios.post('/api/tracks/', { 
      track: trackInfo
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
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
    axios.get(`https://api.spotify.com/v1/search?q=${filter}:${search}&type=track`)
    .then((data) => {
      let songs = data.data.tracks.items
      this.setState({dataSource: songs})
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  render(){
    let { search, filter, songs } = this.state
    const searchSongs = songs.map((song, idx) => (
        <div>
          <SongEntry songInfo={song} addSong={(e) => this.addSongToPlaylist(e)} images={song.album.images}/>
        </div>
    ));
    return (
      <div className="searchcontainer-container">
        <SearchBar stats={this.state} text={search} 
        selectedOption={filter} 
        handleSelect={(e) => this.setSelected(e)} 
        handleSearch={this.searchSpotify} 
        handleChange={(e) => this.enterSearch(e)} />
        
        <div>
          <SongGenreSection addSong={(e) => this.handleSongAdd(e)} songs={songs} />
        </div>
      </div>
    )
  }
}
export default SearchContainer;