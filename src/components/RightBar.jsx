import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { RaisedButton as Button } from 'material-ui';
import Track from './Track.jsx';
// import { } from '../actions/playlistStatActions';

class RightBar extends Component {

  render() {
    const { recentlyAddedTracks, recentlyPlayedTracks, trendingTracks, owner, id } = this.props.playlist;
    const playlistButton = this.props.playlist.id ? (
      <div className="right-display-feature">
          <a href={`http://open.spotify.com/user/${owner}/playlist/${id}`} target="_blank">
            <Button className="secondary-button" type="primary" onClick={this.startPlaylist}><span>Open in Spotify</span></Button>
          </a>
        </div>
    ) : <div></div>;
    return (
      <div className="rightBar-container">
        {playlistButton}
        <div><h2>Playlist Stats:</h2></div>
          <div>
         <h2>Recently Added</h2>
          <div>{recentlyAddedTracks.map(track => (
            <div>
              <Track track={track}/>
            </div>
            ))}</div>
          <h2>Trending Songs</h2>
          <div>{trendingTracks.map(track => (
            <div>{track.title}</div>
            ))}</div>
          <h2>Recently Played</h2>
          <div>{recentlyPlayedTracks.map(track => (
            <div>
              <Track track={track}/>
            </div>
            ))}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist 
  };
};

const mapDispatchToProps = dispatch => {
  return {
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightBar);