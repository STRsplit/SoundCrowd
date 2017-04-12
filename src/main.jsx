import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect, Match } from 'react-router-dom';

import App from './components/App.jsx';
import Login from './components/login/Login.jsx';
import NewPlaylist from './components/NewPlaylist.jsx';
import Playlists from './components/Playlists.jsx';
import Playlist from './components/Playlist.jsx';
import SearchContainer from './components/SearchContainer.jsx'; 
import AccordionTest from './components/AccordionTest.jsx';


import keys from './config/keys.js';
import axios from 'axios';
import $ from 'jquery';
import '../node_modules/elemental/less/elemental.less';
import Foundation from 'react-foundation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


require("!style-loader!css-loader!sass-loader!./styles/sass/all.scss");


class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			location: '',
			weather: '',
			mood: '',
			activity: '',
      playlist:''
		}
    this.setPlaylist = this.setPlaylist.bind(this);
    this.handleMood = this.handleMood.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
	}

	componentWillMount() {
		axios.get('/api/verifyuser')
		.then(result => {
			console.log('result', result);
			if (result.data) {
				this.setState({loggedIn: true});

				axios.get('http://ip-api.com/json')
				.then(function(res) {
					this.setState({
						location: res['data']['city']
					});
					console.log(this.state.location);
				}.bind(this))
				.then(function() {
					axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.location + '&appid=' + keys['weather'])
					.then(function(res) {
						this.setState({
							weather: res['data']['weather'][0]['main']
						})
						console.log(this.state.weather);
					}.bind(this))
				}.bind(this));
			}
		})
		.catch(err => console.log('main.js error componentDidMount: ', err));
	}

  setPlaylist(playlistId) {
    this.setState({ playlist: playlistId });
  }

	handleMood(val) {
		this.setState({
			mood: val 
		});
	}

	handleActivity(val) {
		this.setState({
			activity: val
		});
	}

  render() {
    console.log('logged in', this.state.loggedIn);
    return (
      <BrowserRouter>
			  <div>
				  <Route path="/login" render={() => (
		      	this.state.loggedIn ? <Redirect to="/" /> : <Login />
		      )}/>
          <Route path="/playlists" render={() => (
            this.state.loggedIn ? <Playlists setPlaylist={this.setPlaylist} /> : <Redirect to="/login" />
          )}/>
          <Route path="/tracks" render={() =>(<Playlist playlist={this.state.playlist}/>)}/>
          <Route path="/search" render={() => (<SearchContainer />)} />
		      <Route exact path="/" render={() => (
		     	  this.state.loggedIn ? <App handleMood={this.handleMood} handleActivity={this.handleActivity}/> : <Redirect to="/login" />
		      )}/>
		      <Route path="/new-playlist" render={() => (
		     	  this.state.loggedIn ? <NewPlaylist state={this.state}/> : <Redirect to="/login" />
		      )}/>
		    </div>
      </BrowserRouter>
    )
  }
}
  
ReactDOM.render(<MuiThemeProvider><Main /></MuiThemeProvider>, document.getElementById('app'));