import React, { Component } from 'react';
import axios from 'axios';

import Track from './Track.jsx';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.getPlaylistTracks();
  }

  getPlaylistTracks() {
    var playlistId = this.props.playlist;
    axios.get('/api/spotify/playlists/' + playlistId)
      .then(res => {
        let tracks = res.data;
        this.setState({ tracks: tracks });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sortTracks() {
  }

  render() {
    const tracks = this.state.tracks.map(track => (
      (
        <Track key={track.song_id} playlist={this.props.playlist} track={track}/>
      )
    ))
    return (
      <div>Tracks:{tracks}</div>
    )
  }
}

export default Playlist;