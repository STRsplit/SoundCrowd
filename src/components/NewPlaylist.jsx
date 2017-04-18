import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filtersActions';
import Playlist from './Playlist.jsx'

class NewPlaylist extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			owner: ''
		}
	}

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
			this.props.setPlaylist({})
		})
		.catch(err => console.log(err));
	}

	render() {
	  return (
	  	<div>
	  	  {this.state.owner === '' ? <h2 id="loading">Loading...</h2> : <Playlist tracks={this.state.tracks} owner={this.state.owner} playlist={this.state.id}/>}
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
