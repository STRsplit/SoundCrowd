import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      console.log('get playlist response ', res);

      this.setState({ playlists: playlists });
    })
    .catch(err => {
      // handle error and display appropriate message
      console.log(err);
    });
  }

  setPlaylist(playlistId) {
    this.props.setPlaylist(playlistId);
  }

  render() {
    const userPlaylists = this.state.playlists.map(playlist => {
      return (
        <div key={playlist.id}>
          <img src=""/>
          <Link to="/tracks" onClick={() => this.setPlaylist(playlist.id)}>
            {playlist.name}
          </Link>
        </div>
      )
    });
    return (
      <div>Playlists:
        <div>{userPlaylists}</div>
      </div>
    )
  }
}

export default Playlists;