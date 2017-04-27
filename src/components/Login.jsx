import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Button } from 'elemental';
import style from '../styles/additionalStyles-css.js';
import { RaisedButton as Button } from 'material-ui';
import TextField from 'material-ui/TextField';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: '',
      showInput: false
    };
    this.showJoinRoom = this.showJoinRoom.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);
  }

  setPlaylist(e) {
    this.setState({ playlist: e.target.value });
  }

  showJoinRoom(e) {
    e.preventDefault();
    this.setState({showInput: true})
  }

  render() {
    const inputRoom = (
      <div className="center-content">
        <TextField className="enter-room-login" underlineFocusStyle={style.focusTextField} hintText="Enter room code here" onChange={this.setPlaylist} />
        <Link to={`/public/playlist/${this.state.playlist}`}>
          <Button disableTouchRipple={true} className="secondary-button" type="primary"><span>Join a Room</span></Button>
        </Link>
      </div>
    )

    const joinButton = (
        <Button onClick={this.showJoinRoom} disableTouchRipple={true} className="main-button" type="primary"><span>Join a Room</span></Button>
    )

    let actionElement = this.state.showInput ? inputRoom : joinButton; 
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
          <div className="button-container">
            {actionElement}
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
