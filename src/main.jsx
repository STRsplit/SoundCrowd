import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import App from './components/App.jsx';
import $ from 'jquery';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true
		}
		this.getWeather = this.getWeather.bind(this);
	}

	getWeather() {
		console.log('in get weather');
    $.ajax({
			url: '',
			success: function(data) {
				console.log('main data', data);	
			}
		});
	}

	render() {
		return (
			<BrowserRouter>
	      <Route exact path="/" render={() => (
	     	  this.state.loggedIn ? <App /> : <App />
	      )}/>
	    </BrowserRouter>
		)
	}
}
  
ReactDOM.render(<Main />, document.getElementById('app'));

// <BrowserRouter>
//     <Route exact path="/" render={() => (
//     	this.state.loggedIn ? <App /> : <App />
//     )}/>
// </BrowserRouter>