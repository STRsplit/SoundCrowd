import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SongEntry from './SongEntry.jsx';



class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: null
    };
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(vote_val) {
    const { playlist, track } = this.props;
    const { song_id } = track;
    this.props.handlePlaylistVote(song_id, playlist, vote_val);
    this.setState({ voted: vote_val });
  }

  render() {
    const { voted } = this.state;
    const { title, artist, vote_count, img_url } = this.props.track; 
    const { isTop } = this.props
    const voteUp = (
      <div>
        <div className="triangle-up" onClick={() => this.handleVote(1)}></div>
        <span className="voteCount">{vote_count}</span>
        <div className="triangle-down" onClick={() => this.handleVote(-1)}></div>
      </div>
    );

    const noVote = (
      <div className="top-track-no-vote">
        <div className="right-triangle"></div>
      </div>
    );

    let voteActions = isTop ? noVote : voteUp;
    let trackClass = isTop ? 'topTrack' : 'track';

    return (
      <div>
      <div className={`${trackClass}-main-container`}>
        <div>
        </div>
        <div className="track-dual-container">
            <div className="track-vote-container">
                <div className="track-vote-container-inner">     
                   {voteActions}
                </div>
              </div>
           
            <div className="track-song-details">
              <div className="track-song-details-inner flexbox-container container">
                <div className="track-image box">
                  <img src={img_url}/>
                </div>
                  <div className="song-entry-header">
                    <h3>{title}</h3>
                    <h4>{artist}</h4>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default Track;
