import React, { Component } from 'react';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';

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
    console.log('PLAYLIST ID 2', playlistId)
    this.props.setPlaylist(playlistId);
  }

  render() {

    const userPlaylists = this.state.playlists.map(playlist => {
      return (
        <div key={playlist.id}>
          <img src=""/>
          <Link to={`/app/playlist/${playlist.id}`} onClick={() => this.setPlaylist(playlist.id)}>
            {playlist.name}
          </Link>
        </div>
      )
    })

    return (
      <div>
        <div><Link to="/app/search">Search</Link></div>
        <div>
          <h2>Playlists:</h2>
          <div>{userPlaylists}</div>
        </div>
      </div>
    )
  }
}

export default Playlists;