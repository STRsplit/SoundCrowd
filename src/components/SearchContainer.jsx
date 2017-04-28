import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { enterSearch, setDataSource, setSearchResults, setSearchDefaults, setFilter } from '../actions/searchActions';
import { setRecentAddedTracks } from '../actions/playlistActions';

import { Grid, Row, Col } from 'react-flexbox-grid';
import axios from 'axios';

import SongGenreSection from './SearchCriteria.jsx'
import SongEntry from './SongEntry.jsx';
import SearchBar from './SearchBar.jsx';
import AccordionTest from './AccordionTest.jsx';

class SearchContainer extends Component {

  componentWillMount() {
    this.props.setSearchDefaults();
    this.handleSongAdd = this.handleSongAdd.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.autoCompleteSearchSpotify = this.autoCompleteSearchSpotify.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  enterSearch(input){
    let search = input.target === undefined ? input : input.target.value;
    this.props.enterSearch(search)
    .then(() => {
      this.autoCompleteSearchSpotify();
    })
    .catch(err => {
      console.log(err);
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
    let artist;
    if (targetSong.artist === undefined) {
      artist = targetSong.artists[0].name;
    } else {
      artist = targetSong.artist[0].name;
    }
    let { id, name, album } = targetSong;
    let image = album.images[2].url;
    let trackInfo = {
      song_id: id,
      artist: artist,
      title: name,
      playlist_id: this.props.playlist.id,
      image: image
    };

    axios.post('/api/tracks/', { 
      track: trackInfo
    })
    .then(res => {
      this.updateRecentSongs(trackInfo);
    })
    .catch(error => {
      console.log('Request resulted in an error', error);
    })
  }

  addSongToPlaylist(event) {
    event.preventDefault();
    this.props.setSearchDefaults();
  }

  searchSpotify() {
    const { search, filter } = this.props.search
    axios.get('/api/search/', { 
      params: {
        name: search,
        filter: filter,
        playlist: this.props.playlist.id
      }
    })
    .then(data => {
      let songs = data.data;
      let search = '';
      this.props.setSearchResults(songs, search);
    })
    .catch(error => {
      console.log('Request resulted in an error', error);
    })
  }

  autoCompleteSearchSpotify() {
    let { search, filter } = this.props.search;
    axios.get(`https://api.spotify.com/v1/search?q=${filter}:${search}&type=track`)
    .then(data => {
      let songs = data.data.tracks.items;
      this.props.setDataSource(songs);
    })
    .catch(error => {
      console.log('Request resulted in an error', error);
    })
  }

  render(){
    let { search, filter, songs } = this.props.search;
    return (
      <div className="searchcontainer-container">
        <SearchBar stats={this.props.search} text={search} 
          selectedOption={filter} 
          handleSelect={this.setSelected} 
          handleSearch={this.searchSpotify} 
          handleChange={this.enterSearch}
        />
        
        <div>
          <SongGenreSection addSong={this.handleSongAdd} songs={songs} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    playlist: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRecentAddedTracks: tracks => {  
      dispatch(setRecentAddedTracks(tracks));
    },
    enterSearch: search => {
      return dispatch(enterSearch(search));
    },
    setDataSource: songs => {
      dispatch(setDataSource(songs));
    },
    setSearchResults: (songs, search) => {
      dispatch(setSearchResults(songs, search));
    },
    setSearchDefaults: () => {
      dispatch(setSearchDefaults());
    },
    setFilter: filter => {
      dispatch(setFilter(filter))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);