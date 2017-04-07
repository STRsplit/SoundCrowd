import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    console.log('Login');
  }

  render() {
    return(
      <div>
        <a href="/auth/spotify" >
          Login Spotify
        </a>
      </div>
    );
  }

}

export default Login;