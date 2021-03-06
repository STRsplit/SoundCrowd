import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import { setPlaylist, setPlaylistId, setPlaylistTracks, setPlaylistOwner, setVoteErrorPopup, setRecentAddedTracks, setRecentPlayedTracks } from '../actions/playlistActions';

import AccordionTest from './AccordionTest.jsx';
import CurrentSongBar from './currentSongBar/CurrentSongBar.jsx';
import VoteErrorPopup from './VoteErrorPopup.jsx';
import Track from './Track.jsx';
import SearchPopup from './SearchRevision.jsx';
import JoinRoom from './joinRoom/JoinRoom.jsx';

import FlipMove from 'react-flip-move';
import { RaisedButton as Button } from 'material-ui';

class Playlist extends Component {

  componentWillMount () { 
    this.votingError = false;
    this.showOpenSpotifyButton = false;
    
    this.getPlaylistTracks = this.getPlaylistTracks.bind(this);
    this.handlePlaylistVote = this.handlePlaylistVote.bind(this);
    this.handlePlaylistUpdate = this.handlePlaylistUpdate.bind(this);
    this.getSessionInfo = this.getSessionInfo.bind(this);
    this.handleSongVoteUpdate = this.handleSongVoteUpdate.bind(this);
    this.displayTracks = this.displayTracks.bind(this);
    this.startPlaylist = this.startPlaylist.bind(this);
    this.handleVoteError = this.handleVoteError.bind(this);
    this.startSocket = this.startSocket.bind(this);
  }

  componentDidMount() { 
    this.getPlaylistTracks();
  } 

  componentWillUnmount(){ 
    this.socket.disconnect();
  }

  startSocket() { 
    this.socket = io.connect();
    this.socket.emit('playlistId', this.props.match.params.playlistId);
    this.socket.on('join', joinedRoom => {
      this.getSessionInfo();
    });
    this.socket.on('updatePlaylist', playlistData => {
      this.handlePlaylistUpdate(playlistData);
    });
    this.socket.on('updateSongVoteCount', songVoteData => {
      this.handleSongVoteUpdate(songVoteData);
    });
    this.socket.on('voteError', voteErrorInfo => {
      this.handleVoteError(true, voteErrorInfo);
      console.log('Sorry, but you\'ve already voted:', voteErrorInfo);
    });
    this.socket.on('addTrack', track => {
      let currentList = this.props.playlist.recentlyAddedTracks;
      currentList.unshift(track);
      this.props.setRecentAddedTracks(currentList);
    });
    this.socket.on('recentlyPlayed', track => {
      let currentList = this.props.playlist.recentlyPlayedTracks;
      currentList.unshift(track);
      this.props.setRecentPlayedTracks(currentList);
    })
  } 

  handlePlaylistVote(song_id, playlist_id, vote_val){
    const { user_id, session_id } = this.socket;
    const voteData = {
      songId: song_id,
      playlistId: playlist_id,
      vote: vote_val,
      user_id: user_id,
      session_id: session_id
    }
    this.socket.emit('recordVote', voteData);
  }

  getSessionInfo() {
    axios.get('/api/user/session_info')
      .then(res => {
        const { session_id, user_id } = res.data;
        this.socket.session_id = session_id;
        this.socket.user_id = user_id;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlaylistTracks(playlistId) {
    if(this.socket) {
      this.socket.disconnect();
    }
    playlistId = playlistId || this.props.match.params.playlistId;
    axios.get('/api/playlists/' + playlistId)
    .then(res => {
      let { owner, tracks } = res.data;
      this.showOpenSpotifyButton = this.props.user.id === owner;
      this.props.setPlaylist({
        id: playlistId,
        owner: owner,
        tracks: tracks
      });
      this.startSocket();  
    })
    .catch(err => {
      console.log(err);
    });
  }

  handlePlaylistUpdate(playlist) {
    if(!playlist){
      console.log('ERROR WITH PLAYLIST');
    } else {
      this.props.setPlaylistTracks(playlist);
    }
  }

  handleSongVoteUpdate(songVoteData) {
    const { songId, vote } = songVoteData;
    let tracks = this.props.playlist.tracks;
    tracks = tracks.map(track => {
      if(track.song_id === songId){
        track.vote_count += vote
        return track;
      } else {
        return track;
      }
    })
    this.props.setPlaylistTracks(tracks);
  }

  handleVoteError(open, message){
    this.votingError = true;
    this.props.setVoteErrorPopup(true, message);
    this.votingError = false;
  }


  startPlaylist() {
    axios.post('/api/spotify/play', { playlist: this.props.match.params.playlistId })
    .catch(err => {
      console.log(err);
    });
  }

  displayTracks() {
    const { tracks, id } = this.props.playlist;
    return tracks.sort((a,b) => a.position - b.position).map((track, ind) => (
      <Track key={track.song_id} 
      playlist={id}
      track={track}
      isTop={ind === 0 ? true : false}
      getPlaylistTracks={this.getPlaylistTracks}
      handlePlaylistVote={this.handlePlaylistVote} />
    ));
  }

  render() { 
    const { tracks, id, owner, voteErrorPopup } = this.props.playlist;
    const { open, message } = voteErrorPopup;
    const openSpotifyButton = this.showOpenSpotifyButton ? 
      (<div className="no-display-feature">
        <a href={`http://open.spotify.com/user/${owner}/playlist/${id}`} target="_blank">
          <Button className="main-button" type="primary" label="Open in Spotify" onClick={this.startPlaylist}></Button>
        </a>
      </div>) : '';

    return (
      <div>
        <div>
          <CurrentSongBar getPlaylistTracks={this.getPlaylistTracks} playlistId={id} />
                    { openSpotifyButton }
          <div className="feature-actions-responsive">
            <div>
              <SearchPopup/>
            </div>
            <div>
              <JoinRoom getPlaylistTracks={this.props.getPlaylistTracks} />
            </div>
          </div>
          <div><VoteErrorPopup open={this.votingError} message={message} onVoteError={this.handleVoteError}/></div>
          <div className="playlist-tracks-outer-container">
            <FlipMove>
            {this.displayTracks()}
            </FlipMove>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlaylist: playlist => {  
      dispatch(setPlaylist(playlist));
    },
    setPlaylistId: id => { 
      dispatch(setPlaylistId(id));
    },
    setPlaylistTracks: tracks => { 
      dispatch(setPlaylistTracks(tracks));
    },
    setPlaylistOwner: owner => { 
      dispatch(setPlaylistOwner(owner));
    },
    setVoteErrorPopup: (visibility, message) => {
      dispatch(setVoteErrorPopup(visibility, message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
