import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setPlaylist, setPlaylistId, setPlaylistTracks, setPlaylistOwner } from '../actions/playlistActions';

import AccordionTest from './AccordionTest.jsx';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import Track from './Track.jsx';
import { Button } from 'elemental';
import io from 'socket.io-client';

class Playlist extends Component {

  componentWillMount () {
    this.socket = io.connect();
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);

    this.handlePlaylistVote = this.handlePlaylistVote.bind(this);
    this.handlePlaylistUpdate = this.handlePlaylistUpdate.bind(this);
    this.getSessionInfo = this.getSessionInfo.bind(this);
    this.handleSongVoteUpdate = this.handleSongVoteUpdate.bind(this);
  }

   handlePlaylistVote(song_id, playlist_id, vote_val){
    let voteData = {
      songId: song_id,
      playlistId: playlist_id,
      vote: vote_val,
      user_id: this.socket.user_id,
      session_id: this.socket.session_id
    }
    this.socket.emit('recordVote', voteData)
  }

  componentDidMount() {
    let context = this
    this.getPlaylistTracks();
    this.socket.emit('playlistId', this.props.playlist)
    this.socket.on('join', function(joinedRoom) {
      context.getSessionInfo();
    });
    this.socket.on('updatePlaylist', function(playlistData){
      context.handlePlaylistUpdate(playlistData);
    });
    this.socket.on('updateSongVoteCount', function(songVoteData){
      context.handleSongVoteUpdate(songVoteData);
    });
    this.socket.on('voteError', function(voteErrorInfo){
      console.log('Sorry, but you\'ve already voted:', voteErrorInfo)
    });
  }

  getSessionInfo() {
    let context = this
    axios.get('/api/user/sessionInfo', {
      // params: {}
    })
    .then(res => {
      console.log(res.data)
      const { session_id, user_id } = res.data
      context.socket.session_id = session_id
      context.socket.user_id = user_id
    })
    .catch(err => {
      console.log(err);
    });
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

  handlePlaylistUpdate(playlist) {
    if(!playlist){
      console.log('ERRORR WITH PLAYLIST')
    } else {
      this.setPlaylistTracks({tracks: playlist});
    }
  }

  handleSongVoteUpdate(songVoteData) {
    console.log(songVoteData);
    const { songId, vote } = songVoteData
    let tracks = this.state.tracks
    tracks = tracks.map(track => {
      if(track.song_id === songId){
        track.vote_count += vote
        return track;
      } else {
        return track;
      }
    })
    this.setPlaylistTracks({ tracks })
  }

 
  

  sortTracks() {
    // var sortedTracks = this.state.tracks.sort((a, b) => {
    //   a.vote_count - b.vote_count;
    // })
    // this.setState({ tracks: sortedTracks });
  }

  render() {
    const { playlist } = this.props 
    var tracks = playlist.tracks.map(track => (
      <Track key={track.song_id} 
      playlist={playlist.id} 
      track={track} 
      getPlaylistTracks={this.getPlaylistTracks}
      handlePlaylistVote={this.handlePlaylistVote} />
    ));
    
    return (
      <div>
        <CurrentSongBar />
        <div>
          <a href={`http://open.spotify.com/user/${this.props.playlist.owner}/playlist/${this.props.playlist.id}`}>
            <Button type="primary"><span>Open in Spotify</span></Button>
          </a>
        </div>
        <div>{playlistTracks}</div>
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
