import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'elemental';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.spotifyAuth = this.spotifyAuth.bind(this);
    console.log('Login');
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
          <h2>Logo</h2>
        </div>
          <div className="button-container">
            <Button type="primary"><a style={{"color": "white"}} href="auth/spotify"><span>Login Spotify</span></a></Button>
          </div>
        </div>
          <div>
          <div className="button-container">
            <Button type="primary"><span>Join a Room</span></Button>
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