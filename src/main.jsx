import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import keys from './config/keys.js';
import axios from 'axios';
import $ from 'jquery';

import App from './components/App.jsx';
import SearchContainer from './components/SearchContainer.jsx'


class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true,
			location: '',
			weather: ''
		}
	}

	componentWillMount() {
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

	render() {
		return (
			<BrowserRouter>
	      <Route exact path="/" render={() => (
	     	  this.state.loggedIn ? <SearchContainer /> : <SearchContainer />
	      )}/>
	    </BrowserRouter>
		)
	}
}
  
ReactDOM.render(<Main />, document.getElementById('app'));