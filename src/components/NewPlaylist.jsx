import React from 'react';
import axios from 'axios';

class NewPlaylist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			href: ''
		}
	}

	componentDidMount() {
		axios.post('/setPreferences', { 
			mood: this.props.state.mood, 
			activity: this.props.state.activity 
		}) 
		.then((res) => {
			axios.get('/getCategory')
			.then((result) => {
				console.log('test result: ', result);
			  this.setState({
			  	href: result.data.link
			  });
			})
		})
		.catch((err) => {
			console.log(err);
		});
	}

	render() {
		console.log(this.props.state.mood);
		console.log(this.props.state.activity);
	  return (
	  	<div>
	  	  <h1>Recommended Playlist</h1>
	  	  <a href={this.state.href}>Your Playlist</a>	  
		  </div>	
	  );
	}
}

export default NewPlaylist;