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
    axios.get('/api/playlists/' + playlistId)
      .then(res => {
        let tracks = res.data.items;
        this.setState({ tracks: tracks });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const tracks = this.state.tracks.map(track => (
      (
        <Track key={track.track.id} track={track.track}/>
      )
    ))
    return (
      <div>Tracks:{tracks}</div>
    )
  }
}

export default Playlist;