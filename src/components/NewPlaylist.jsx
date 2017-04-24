import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filtersActions';
import { setPlaylist } from '../actions/playlistActions';
import Playlist from './Playlist.jsx';
import { Spinner } from 'elemental';

class NewPlaylist extends React.Component {


	componentDidMount() {
		const { mood, activity } = this.props.filters;
		axios.post('/api/spotify/playlists', { 
			mood,
			activity
		}) 
		.then((res) => {
      var id = res.data;
      this.props.history.push(`/app/playlists/${id}`);
		})
		.catch(err => console.log(err));
	}

	render() {
	  return (
	  	<div>
        <Spinner size="lg" />
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
    setPlaylist: (playlist) => {
      dispatch(setPlaylist(playlist));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist);
