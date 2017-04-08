import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';

class Playlist extends Component {
  constructor(props) {
    super(props);
    console.log('playlist props', this.props);
    console.log('maybe params', this.props.params);
    this.state = {
      tracks: []
    };
  }

  getPlaylistTracks() {
    var playlistId = '3IRbQztcqbKgejR1RRbtsK';
    axios.get('/api/playlists/' + playlistId, {})
      .then(res => {
        console.log(res.data);
        let tracks = res.data.items;
        this.setState({ tracks: tracks });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getPlaylistTracks();
  }

  render() {
    console.log(this.state.tracks);
    const tracks = this.state.tracks.map(track => (
      (
        <div key={track.track.id}>
          {track.track.name}
        </div>
      )
    ))
    return (
      <div>Tracks:{tracks}</div>
    )
  }
}

export default Playlist;