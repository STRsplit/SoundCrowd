import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Button } from 'elemental';
import { RaisedButton as Button } from 'material-ui';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: ''
    };
    
    this.setPlaylist = this.setPlaylist.bind(this);
  }

  setPlaylist(e) {
    this.setState({ playlist: e.target.value });
  }

  render() {
    return (
      <div className="login-container">
        <div>
          <div className="center-content">
            <h2>SoundCrowd</h2>
          </div>
          <div className="button-container">
            <a style={{"color": "white"}} href="auth/spotify"><Button disableTouchRipple={true} className="main-button" type="primary"><span>Log into Spotify</span></Button></a>
          </div>
        </div>
        <div>
          <div className="button-container">
            <Link to={`/public/playlist/${this.state.playlist}`}>
              <Button disableTouchRipple={true} className="main-button" type="primary"><span>Join a Room</span></Button>
            </Link>
            <div className="center-content">
              <input type="text" placeholder="Enter room code here..." onChange={this.setPlaylist}/>
            </div>
          </div>
        </div>
        <div className="about-brief">
          <p className="tagline">SoundCrowd, let the crowd control the sound of any event; a realtime experience with live voting and track reordering - highest voted song plays next!</p>
        </div>
        <div className="spotifyLogoContainer">
          <img className="spotifyLogo" src="./assets/images/spotify-clipart.png"/>
        </div>
      </div>
    );
  }

}

export default Login;
