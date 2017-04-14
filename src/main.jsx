import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, BrowserHistory, Route, Redirect, Match, Link, Switch } from 'react-router-dom';

import App from './components/App.jsx';
import Login from './components/Login.jsx';
import NewPlaylist from './components/NewPlaylist.jsx';
import Playlists from './components/Playlists.jsx';
import Playlist from './components/Playlist.jsx';
import PlaylistRoute from './components/routes/PlaylistRoute.jsx';
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
      playlist:'',
      name: ''
		}
    this.setPlaylist = this.setPlaylist.bind(this);
    this.handleMood = this.handleMood.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
    this.logout = this.logout.bind(this);
	}


	componentWillMount() {
		axios.get('/api/verifyuser')
		.then(result => {
			console.log('result', result);
			if (result.data.login) {
				this.setState({
					loggedIn: true,
					name: result.data.name
				});

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
			} else {
        this.setState({loggedIn: false});
      }
		})
		.catch(err => console.log('main.js error componentDidMount: ', err));
	}

	logout() {
		console.log('logout clicked');
    axios.get('/logout')
    .catch((err) => {
      console.log(err);
    });
    this.setState({
    	loggedIn: false
    });
	}

  setPlaylist(playlistId) {
    console.log('PLAYLISTTTTTT!!!!', playlistId)
    this.setState({ playlist: playlistId })
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

  /*<Route exact path="/playlists" render={() => (<Playlists setPlaylist={this.setPlaylist} />)}/>*/

  render() {
    const { playlist, loggedIn } = this.state

    console.log('logged in', this.state.loggedIn);
    return (
      <BrowserRouter>
			  <div>
        <Route path="*" render={({path}) => (
            this.state.loggedIn ? <Redirect to={path} /> : <Redirect to="/login" />
          )}/>
        <Route path="/login" render={() => (
            this.state.loggedIn ? <Redirect to="/app" /> : <Login />
          )}/>

        <Route path="/app" render={() => 
          (<App stats={this.state} setPlaylist={this.setPlaylist} handleMood={this.handleMood} handleActivity={this.handleActivity}/>)}/>
		    </div>
      </BrowserRouter>
    )
  }
}
  
ReactDOM.render(<MuiThemeProvider><Main /></MuiThemeProvider>, document.getElementById('app'));

