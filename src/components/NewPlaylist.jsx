import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filtersActions';
import { setPlaylist } from '../actions/playlistActions';
import Playlist from './Playlist.jsx'

class NewPlaylist extends React.Component {


	componentWillMount() {
		const { mood, activity } = this.props.filters;
		console.log('mood ', mood);
		console.log('activity ', activity);
    console.log('in comp will mount');
		axios.post('/api/spotify/playlists', { 
			mood,
			activity
		}) 
		.then(res => {
			console.log('post went through');
			axios.get('/api/spotify/create')
			.then((result) => {
				console.log('test result: ', result);
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
	  	  {this.props.playlist.owner === '' ? <h2 id="loading">Loading...</h2> : <Playlist />}
		  </div>	
	  );
	}
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    playlist: state.playlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (playlist) => { //this.props.setPlaylist to access this global state function
      dispatch(setPlaylist(playlist));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist);
