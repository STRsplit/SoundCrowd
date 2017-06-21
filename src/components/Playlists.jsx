import React, { Component } from 'react';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPlaylists } from '../actions/playlistsActions';
import { setPlaylistId, setPlaylistTracks, setPlaylistOwner } from '../actions/playlistActions';

import PlaylistSuggester from './playlistSuggester/PlaylistSuggester.jsx';

import { Spinner } from 'elemental';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

class Playlists extends Component {

  componentWillMount () {
    this.defaultImage = './assets/images/default-albumart.png';
    this.spotifyIcon = './assets/images/spotify-icon.png';
    this.loaded = false;
    this.creating = false;
    this.showLoading = this.showLoading.bind(this);
    this.displayPlaylists = this.displayPlaylists.bind(this);
    this.displayAll = this.displayAll.bind(this);
  }

  componentDidMount() {
    axios.get('/api/spotify/playlists/')
    .then(result => {     
      let playlists = result.data.items;
      this.loaded = true;
      this.props.setPlaylists(playlists);
    })
    .catch(err => console.log('Playlists > componentDidMount error: ', err));
  }

  showLoading() {
    this.creating = true;
    this.props.setPlaylists(true);
  }

  displayPlaylists() {
    return this.props.playlists.playlists.map(playlist => {
      const { images, id, name, external_urls, tracks } = playlist;
      const imageUrl = images.length > 0 ? images[0].url : this.defaultImage;
      return (            
        <div className="playlists-single-container" key={id} >        
          <Link to={`/playlist/${id}`} 
            style={style.link} 
            onClick={() => this.props.setPlaylistId(id)}
          >  
          <div>
            <img src={imageUrl} style={style.image} />            
          </div> 
          </Link>   
          <div className="playlists-single-details">
            <h3 className="playlists-h3" >{name}</h3>
            <hr className="playlists-hr" />            
            <FlatButton
              href={external_urls.spotify}
              target="_blank"
              label="Spotify Link"
              primary={true}
              labelStyle={style.labelstyle}
              style={style.flatbutton}
            >
              <Avatar
                src={this.spotifyIcon}
                size={30}
              />
            </FlatButton>
            <h4><strong>{`${tracks.total} SONGS`}</strong></h4>
          </div>
        </div>
      );
    });
  }

  displayAll() {
    return (
      <div>
        <PlaylistSuggester methods={this.props} loading={this.showLoading}/>
        <hr />
        <h2>PLAYLISTS</h2>
        <div>
          { this.loaded ? this.displayPlaylists() : <Spinner size="lg" /> }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.creating ? <Spinner size="lg"/> : this.displayAll() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlists: state.playlists, 
    playlist: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlaylists: playlists => { 
      dispatch(setPlaylists(playlists));
    },
    setPlaylistId: id => {
      dispatch(setPlaylistId(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);

const style = {
  image: {
    width: '150px',
    height: '150px',
    horizontalAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  },
  labelstyle: {
    paddingLeft: '5px'
  },
  flatbutton: {
    paddingLeft: '12px',
    marginBottom: '5px'
  }
};
