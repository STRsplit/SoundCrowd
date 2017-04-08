import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect, Match } from 'react-router-dom';

import App from './components/App.jsx';
import Login from './components/login/Login.jsx';
import SearchContainer from './components/SearchContainer.jsx'


import keys from './config/keys.js';
import axios from 'axios';
import $ from 'jquery';
require("!style-loader!css-loader!sass-loader!./sass/all.scss");




class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			location: '',
			weather: ''
		}
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

	render() {
		console.log('this.state', this.state.loggedIn);
		return (
			<BrowserRouter>
			  <div>
				  <Route path="/login" render={() => (
		      	this.state.loggedIn ? <Redirect to="/" /> : <Login />
		      )}/>
		      <Route exact path="/" render={() => (
		     	  this.state.loggedIn ? <App /> : <Redirect to="/login" />
		      )}/>
		    </div>
		  </BrowserRouter>
		)
	}
}
  
ReactDOM.render(<Main />, document.getElementById('app'));