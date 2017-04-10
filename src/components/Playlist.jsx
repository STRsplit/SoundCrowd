import React, { Component } from 'react';
import axios from 'axios';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
  }

  getPlaylistTracks() {
    var playlistId = this.props.playlist;
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
    const tracks = this.state.tracks.map(track => (
      (
        <div key={track.track.id}>
          {track.track.name} - {track.track.artists ? track.track.artists[0].name : ''}
        </div>
      )
    ))
    return (
      <div>Tracks:{tracks}</div>
    )
  }
}

export default Playlist;