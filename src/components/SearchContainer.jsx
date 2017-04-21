import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { enterSearch, setDataSource, setSearchResults, setSearchDefaults, setFilter } from '../actions/searchActions';
import { setRecentTracks } from '../actions/playlistActions';

import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios';

import SongGenreSection from './SearchCriteria.jsx'
import SongEntry from './SongEntry.jsx';
import SearchBar from './SearchBar.jsx';
import AccordionTest from './AccordionTest.jsx';

class SearchContainer extends Component {

  componentWillMount() {
    this.handleSongAdd = this.handleSongAdd.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.autoCompleteSearchSpotify = this.autoCompleteSearchSpotify.bind(this);
    this.updateRecentSongs = this.updateRecentSongs.bind(this);
  }

  enterSearch(input){
    let search = input.target === undefined ? input : input.target.value;
    this.props.enterSearch(search)
    .then(() => {
      this.autoCompleteSearchSpotify();
    })
  }
  setSelected(event){
    const filter = event.target.value;
    this.props.setFilter(filter);
  }

  handleSongAdd(e) {
    const { playlist, dataSource } = this.props.search;
    let targetSong = dataSource.filter(song => {
      if(e.target.value === song.id){
        return song;
      }})[0];

    targetSong.artist = targetSong.artist ? targetSong.artist[0].name : targetSong.artists[0].name
    let trackInfo = {
      song_id: targetSong.id,
      artist: targetSong.artist,
      title: targetSong.name,
      playlist_id: this.props.playlist.id
    }

    axios.post('/api/tracks/', { 
      track: trackInfo
    })
    .then((res) => {
      this.updateRecentSongs(trackInfo);
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  addSongToPlaylist(event) {
    event.preventDefault();
    this.props.setSearchDefaults();
  }

  searchSpotify() {
    const { search, filter } = this.props.search
    axios.get('/api/spotify/search/', { 
      params: {
        name: search,
        filter: filter
      }
    })
    .then((data) => {
      let songs = data.data;
      let search = '';
      this.props.setSearchResults(songs, search)
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  autoCompleteSearchSpotify() {
    let { search, filter } = this.props.search
    axios.get(`https://api.spotify.com/v1/search?q=${filter}:${search}&type=track`)
    .then((data) => {
      let songs = data.data.tracks.items
      this.props.setDataSource(songs)
    })
    .catch((error) => {
      console.log('Request resulted in an error', error);
    })
  }

  updateRecentSongs(track) {
    console.log(this.props.playlist.recentTracks);
    let currentList = this.props.playlist.recentTracks
    currentList.unshift(track)
    this.props.setRecentTracks(currentList);
  }

  render(){
    let { search, filter, songs } = this.props.search
    const searchSongs = songs.map((song, idx) => (
        <div>
          <SongEntry songInfo={song} addSong={(e) => this.addSongToPlaylist(e)} images={song.album.images}/>
        </div>
    ));
    return (
      <div className="searchcontainer-container">
        <SearchBar stats={this.props.search} text={search} 
          selectedOption={filter} 
          handleSelect={(e) => this.setSelected(e)} 
          handleSearch={this.searchSpotify} 
          handleChange={(e) => this.enterSearch(e)} 
        />
        
        <div>
          <SongGenreSection addSong={(e) => this.handleSongAdd(e)} songs={songs} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    playlist: state.playlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRecentTracks: (tracks) => {  
      dispatch(setRecentTracks(tracks));
    },
    enterSearch: (search) => {
      return dispatch(enterSearch(search));
    },
    setDataSource: (songs) => {
      dispatch(setDataSource(songs));
    },
    setSearchResults: (songs, search) => {
      dispatch(setSearchResults(songs, search));
    },
    setSearchDefaults: () => {
      dispatch(setSearchDefaults());
    },
    setFilter: (filter) => {
      dispatch(setFilter(filter))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);