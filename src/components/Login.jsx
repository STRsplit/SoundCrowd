import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'elemental';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: ''
    };
    this.spotifyAuth = this.spotifyAuth.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);
  }

  setPlaylist(e) {
    this.setState({ playlist: e.target.value });
  }

  spotifyAuth(e){
    e.preventDefault()
    axios.get('/auth/spotify');
  }

  render() {
    return(
      <div className="login-container">
        <div>
          <div className="center-content">
            <h2>SoundCrowd</h2>
          </div>
          <div className="button-container">
            <a style={{"color": "white"}} href="auth/spotify"><Button type="primary"><span>Log into Spotify</span></Button></a>
          </div>
        </div>
        <div>
          <div className="button-container">
            <Link to={`/playlists/${this.state.playlist}`}>
              <Button type="primary"><span>Join a Room</span></Button>
            </Link>
            <div className="center-content">
              <input type="text" placeholder="Enter room code here..." onChange={this.setPlaylist}/>
            </div>
          </div>
        </div>
        <div className="about-brief">
          <p className="tagline">Lorem Ipsum dhfjh adsljhfjashd  dsfh jaedsjfd. fjdshjfhjas e jledhsfj h sdlkafh ljads f </p>
        </div>
        <div className="spotifyLogoContainer">
          <img className="spotifyLogo" src="https://img.clipartfest.com/3162c449b8951de3e76ed09cc47ffcbd_-delivery-at-spotify-spotify-clipart-transparent_3159-1228.png"/>
        </div>
      </div>
    );
  }

}

export default Login;