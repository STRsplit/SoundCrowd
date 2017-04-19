import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filtersActions';

class NewPlaylist extends React.Component {

	componentWillMount() {
		this.href = '';
		const { mood, activity } = this.props.filters;

		axios.post('/api/spotify/playlists', { 
			mood,
			activity
		}) 
		.then(result => {
			/* * OLD CODE * *
			axios.get('/getCategory')
			.then((result) => {
				console.log(result);
			  this.href = result.data.link;
			});
			* * OLD CODE * */
		})
		.catch(err => console.log(err));
	}

	render() {
	  return (
	  	<div>
	  	  <h1>Recommended Playlist</h1>
	  	  <a href={this.href}>Your Playlist</a>	  
		  </div>	
	  );
	}
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapStateToProps, null)(NewPlaylist);
