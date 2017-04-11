import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.setMood = this.setMood.bind(this);
		this.setActivity = this.setActivity.bind(this);
	}

	setMood(e) {
		this.props.handleMood(e.target.value);
	}

	setActivity(e) {
		this.props.handleActivity(e.target.value);
	}

	getPlaylist() {
		var count;
		axios.get('/playlist')
		.then((result) => {
			count = result.data.length;
			// console.log('existing playlist ', result);
			axios.post('/create', {number: count});
		});
	}

	render() {
	  return (
	  	<div>
	  	  <h1>Welcome To So Me</h1>
	  	  {this.props.children}
	  	  <div>Use My Playlist</div> 
	  	  <Link to='/new-playlist' onClick={this.getPlaylist}>Get Suggested Playlist</Link>
	  	  <div>Mood</div><select id="mood" onChange={this.setMood}>
	  	    <option value="Choose One">Choose One</option>
	  	    <option value="Happy">Happy</option>
	  	    <option value="Calm">Calm</option>
	  	    <option value="Sad">Sad</option>
	  	    <option value="Focused">Focused</option>
	  	    <option value="Excited">Excited</option>
	  	  </select>
	  	  <div>Activity</div><select id="activity" onChange={this.setActivity}>
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