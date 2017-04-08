import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import axios from 'axios';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
  }

  getPlaylists() {
    axios.get('/api/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      this.setState({ playlists: playlists });
    })
    .catch(err => {
      // handle error and display appropriate message
      console.log(err);
    });
  }

  componentWillMount() {
    this.getPlaylists();
  }

  render() {
    console.log('playlists in state', this.state.playlists);
    const userPlaylists = this.state.playlists.map((playlist, idx) => (
      <div key={idx}>{playlist.name}</div>
    ));
    return (
      <div>Playlists:
        <div>{userPlaylists}</div>
      </div>
    )
  }
}

export default Playlists;