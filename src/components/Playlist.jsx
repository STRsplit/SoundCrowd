import React, { Component } from 'react';
import axios from 'axios';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import Track from './Track.jsx';
import { Button } from 'elemental';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      owner: ''
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
        this.setState({ tracks: res.data.tracks, owner: res.data.owner });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sortTracks() {
    // var sortedTracks = this.state.tracks.sort((a, b) => {
    //   a.vote_count - b.vote_count;
    // })
    // this.setState({ tracks: sortedTracks });
  }

  render() {
    var id = 0;
    var tracks = this.state.tracks.map(track => (
      <Track key={id++} playlist={this.props.playlist} track={track} getPlaylistTracks={this.getPlaylistTracks} />
    ));
    
    return (
      <div>
        <CurrentSongBar />
        <div>
          <a href={`http://open.spotify.com/user/${this.state.owner}/playlist/${this.props.playlist}`}>
            <Button type="primary"><span>Open in Spotify</span></Button>
          </a>
        </div>
        <div>Tracks:{tracks}</div>
      </div>
    )
  }
}

export default Playlist;