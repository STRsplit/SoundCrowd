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
    return (
      <div id='playlist-container'>
        <div>Playlists</div>
        {this.state.playlists.map(playlist => 
          <div key={playlist.id}>
            <img src=""/>
            <Link to="/tracks" onClick={() => this.setPlaylist(playlist.id)}>
              {playlist.name}
            </Link>
          </div>
        )}

    )
  }
}

export default Playlists;