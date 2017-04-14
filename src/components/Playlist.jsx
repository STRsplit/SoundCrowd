import React, { Component } from 'react';
import axios from 'axios';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import Track from './Track.jsx';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    // this.getPlaylistTracks(); 
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
  }

  componentDidMount() {
    this.getPlaylistTracks();
  }

  getPlaylistTracks() {
    axios.get('/api/playlists/' + this.props.playlist)
      .then(res => {
        let tracks = res.data;
        this.setState({ tracks: tracks });
      })
      .catch(err => {
        console.log(err);
      });
  }


  sortTracks() {
    var sortedTracks = this.state.tracks.sort((a, b) => {
      a.vote_count - b.vote_count;
    })
    this.setState({ tracks: sortedTracks });
  }

  // sortTracks() {
  // }

  render() {
    var id = 0;
    var tracks = this.state.tracks.map(track => (
      <Track key={id++} playlist={this.props.playlist} track={track} getPlaylistTracks={this.getPlaylistTracks} />
    ))
    return (
      <div>
        <CurrentSongBar />
        <div>Tracks:{tracks}</div>
      </div>
    )
  }
}

export default Playlist;