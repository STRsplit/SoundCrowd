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
    const { title, artist, vote_count } = this.props.track;
    const voteUp = (
      <div>
        <div className="triangle-up" onClick={() => this.handleVote(1)}></div>
        <span className="voteCount">{vote_count}</span>
        <div className="triangle-down" onClick={() => this.handleVote(-1)}></div>
      </div>
    );

    return (
      <div>
      <div className="track-main-container">
        <div>
        </div>
        <div className="track-dual-container">

            <div className="track-vote-container">
                <div className="track-vote-container-inner">     
                   {voteUp}
                </div>
              </div>
           
            <div className="track-song-details">
              <div className="track-song-details-inner flexbox-container container">
                <div className="track-image box">
                  <img src="https://i.scdn.co/image/5487acf8d22aa518645d90135d8a9a1fed3e902e" />
                </div>
                  <div className="song-entry-header">
                    <h3>{title}</h3>
                    <h4>{artist}</h4>
                  </div>
                </div>
            </div>
          </div>
        <Divider />
      </div>
    </div>
    )
  }
}

export default Track;
