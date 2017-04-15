import React, { Component } from 'react';
import axios from 'axios';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import Track from './Track.jsx';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      owner: this.props.owner
    };
    this.getPlaylistTracks(); 
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.setOwner = this.setOwner.bind(this);
  }

  componentDidUpdate() {
    // this.render();
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

  setOwner(bool) {
    this.setState({ owner: bool });
  }

  sortTracks() {
    var sortedTracks = this.state.tracks.sort((a, b) => {
      a.vote_count - b.vote_count;
    })
    this.setState({ tracks: sortedTracks });
  }

  render() {
    this.state.tracks.forEach(track => {
      console.log(track.title, track.vote_count);
    });
    var id = 0;
    var tracks = this.state.tracks.map(track => (
      <Track key={id++} playlist={this.props.playlist} track={track} getPlaylistTracks={this.getPlaylistTracks} setOwner={this.setOwner} sortTracks={this.sortTracks.bind(this)}/>
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