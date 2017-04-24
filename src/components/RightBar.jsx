import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import { } from '../actions/playlistStatActions';

class RightBar extends Component {

  render() {
    const { recentlyAddedTracks, recentlyPlayedTracks, trendingTracks } = this.props.playlist;

    return (
      <div className="rightBar-container">
        <div><h2>Playlist Stats:</h2></div>
          <div>
         <h3>Recently Added</h3>
          <div>{recentlyAddedTracks.map(track => (
            <div>{track.title}</div>
            ))}</div>
          <h3>Trending Songs</h3>
          <div>{trendingTracks.map(track => (
            <div>{track.title}</div>
            ))}</div>
          <h3>Recently Played</h3>
          <div>{recentlyPlayedTracks.map(track => (
            <div>{track.title}</div>
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