import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../styles/additionalStyles-css.js';
import { RaisedButton as Button , TextField } from 'material-ui';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: '',
      showInput: false,
      errorMessage: ''
    };

    this.showJoinRoom = this.showJoinRoom.bind(this);
    this.setPlaylist = this.setPlaylist.bind(this);
    this.validatePlaylist = this.validatePlaylist.bind(this);
  }

  setPlaylist(e) { 
    this.setState({ 
      playlist: e.target.value,
      errorMessage: ''
    });
  }

  showJoinRoom(e) {
    e.preventDefault();
    this.setState({showInput: true})
  }

  validatePlaylist() {
    axios.get(`/api/validate/${this.state.playlist}`)
    .then(result => {
      if (result.data) {
        this.props.history.push(`/public/playlist/${this.state.playlist}`);    
      } else {
        this.setState({errorMessage: 'Invalid room code.'});
      }
    })
    .catch(err => console.log('Login.js > validatePlaylist err: ', err)); 
  }

  render() {
    const inputRoom = (
      <div className="center-content">
        <TextField className="enter-room-login" underlineFocusStyle={style.focusTextField} hintText="Enter room code." onChange={this.setPlaylist} errorText={this.state.errorMessage} />
        <Button disableTouchRipple={true} className="secondary-button" type="primary" onTouchTap={this.validatePlaylist} ><span>Join a Room</span></Button>
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
            <h2 className="login-title">SoundCrowd</h2>
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

Login.contextTypes = {
  route: PropTypes.object
};

export default Login;
