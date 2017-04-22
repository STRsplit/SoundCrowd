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
		const { mood, activity } = this.props.filters;
    console.log('in comp will mount');
		axios.post('/api/spotify/playlists', { 
			mood,
			activity
		}) 
		.then(res => {
			axios.get('/api/spotify/create')
			.then((result) => {
				console.log('test result: ', result);
				this.setState({owner: result.data.owner});
				this.props.setPlaylist({
					id: result.data.id,
	        owner: result.data.owner,
	        tracks: result.data.tracks
				});
			})
		})
		.catch(err => console.log(err));
	}

	render() {
	  return (
	  	<div>
	  	  {this.state.owner === '' ? <h2 id="loading">Loading...</h2> : <Playlist />}
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
