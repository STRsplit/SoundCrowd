import React from 'react';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	handleClick() {
		axios.get('/test')
		.then(result => {
			console.log('test result: ', result.data);
		})
	}

	render() {
	  return (
	  	<div>
	  	  <h1>Welcome To So Me</h1>
	  	  {this.props.children}
	  	  <div>Use My Playlist</div>
	  	  <div onClick={this.handleClick}>Get Suggested Playlist</div>
	  	  <div>Mood</div><select id="mood">
	  	    <option value="Choose One">Choose One</option>
	  	    <option value="Happy">Happy</option>
	  	    <option value="Calm">Calm</option>
	  	    <option value="Sad">Sad</option>
	  	    <option value="Focused">Focused</option>
	  	    <option value="Excited">Excited</option>
	  	  </select>
	  	  <div>Activity</div><select id="activity">
	  	    <option value="Choose One">Choose One</option>
	  	    <option value="Exercising">Exercising</option>
	  	    <option value="Studying">Studying</option>
	  	    <option value="Partying">Partying</option>
	  	    <option value="Chilling">Chilling</option>
	  	    <option value="Driving">Driving</option>
	  	  </select>
		  </div>	
	  );
	}
}

export default App;