import React, { Component } from 'react';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'elemental';
import Paper from 'material-ui/Paper';

class Playlists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      loaded: false
    };
    this.defaultImage = './assets/images/default-albumart.png';
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      this.setState({ playlists, loaded: true });
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
      const image = playlist.images.length > 0 ? playlist.images[0].url : this.defaultImage;
      return (
        <Link key={playlist.id} style={style.link} to={`/app/playlists/${playlist.id}`} onClick={() => this.setPlaylist(playlist.id)}>      
        <div className="playlists-single-container">        
          <Paper zDepth={5} >
            <img src={image} style={style.image} />            
          </Paper> 
          <div className="playlists-single-details">
            <h3 className="playlists-h3" >{playlist.name}</h3>
            <hr className="playlists-hr" />
          </div>
        </div>
        </Link> 
      );
    });

    return (
      <div>
        <hr />
        <h2>PLAYLISTS</h2>        
        <div>
          { this.state.loaded ? userPlaylists : <Spinner size="lg" />  }
        </div>
      </div>
    );
  }
}

export default Playlists;

const style = {
  image: {
    width: '200px',
    height: '200px',
    horizontalAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  }
};


