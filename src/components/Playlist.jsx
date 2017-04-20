import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPlaylist, setPlaylistId, setPlaylistTracks, setPlaylistOwner } from '../actions/playlistActions';

import AccordionTest from './AccordionTest.jsx';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import Track from './Track.jsx';
import { Button } from 'elemental';

class Playlist extends Component {

  componentWillMount () {
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
  }

  componentDidMount() {
    this.getPlaylistTracks();
  }

  getPlaylistTracks() {
    const playlistId = this.props.match.params.playlistId;
    axios.get('/api/playlists/' + playlistId)
      .then(res => {
        const { owner, tracks } = res.data;
        this.props.setPlaylist({
          id: playlistId,
          owner: owner,
          tracks: tracks
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  componenWillUpdate() {}

  sortTracks() {
    // var sortedTracks = this.state.tracks.sort((a, b) => {
    //   a.vote_count - b.vote_count;
    // })
    // this.setState({ tracks: sortedTracks });
  }

  render() {
    var id = 0;
    var tracks = this.props.playlist.tracks.map(track => (
      <Track key={id++} playlist={this.props.playlist.id} track={track} getPlaylistTracks={this.getPlaylistTracks} />
    ));
    
    return (
      <div>
        <CurrentSongBar />
        <div>
          <a href={`http://open.spotify.com/user/${this.props.playlist.owner}/playlist/${this.props.playlist.id}`}>
            <Button type="primary"><span>Open in Spotify</span></Button>
          </a>
        </div>
        <div>{tracks}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPlaylist: (playlist) => {  
      dispatch(setPlaylist(playlist));
    },
    setPlaylistId: (id) => { 
      dispatch(setPlaylistId(id));
    },
    setPlaylistTracks: (tracks) => { 
      dispatch(setPlaylistTracks(tracks));
    },
    setPlaylistOwner: (owner) => { 
      dispatch(setPlaylistOwner(owner));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
