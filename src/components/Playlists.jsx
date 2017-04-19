import React, { Component } from 'react';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPlaylists } from '../actions/playlistsActions';
import { setPlaylistId, setPlaylistTracks, setPlaylistOwner } from '../actions/playlistActions';

import { Spinner } from 'elemental';
import Paper from 'material-ui/Paper';

class Playlists extends Component {

  componentWillMount () {
    this.defaultImage = './assets/images/default-albumart.png';
    this.loaded = false;
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/', {
      // params: {}
    })
    .then(res => {
      let playlists = res.data.items;
      this.loaded = true;
      this.props.setPlaylists(playlists);
    })
    .catch(err => {
      // handle error and display appropriate message
      console.log(err);
    });
  }

  render() {
    const userPlaylists = this.props.playlists.playlists.map(playlist => {
      const image = playlist.images.length > 0 ? playlist.images[0].url : this.defaultImage;
      return (
        <Link to={`/app/playlists/${playlist.id}`} 
          key={playlist.id} style={style.link} 
          onClick={() => this.props.setPlaylistId(playlist.id)}
        >      
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
          { this.loaded ? userPlaylists : <Spinner size="lg" />  }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    playlists: state.playlists, //this.props.playlists to access global state
    playlist: state.playlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylists: (playlists) => { //this.props.setPlaylist to access this global state function
      dispatch(setPlaylists(playlists));
    },
    setPlaylistId: (id) => {
      dispatch(setPlaylistId(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);

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


