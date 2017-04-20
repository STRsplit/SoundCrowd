import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SongEntry from './SongEntry.jsx';

const style = {
};


class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: null
    };
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(vote_val) {
    const { playlist, track } = this.props
    console.log('TRACK', track)
    const { song_id } = track

    this.props.handlePlaylistVote(song_id, playlist, vote_val)
    // var voteStatus = this.state.voted;
    this.setState({ voted: vote_val })

    // axios.post('/api/vote/', {
    //   vote: val,
    //   playlistId: this.props.playlist,
    //   songId: this.props.track.song_id
    // })
    // .then(res => {
    //   // this.setState({ voteCount: this.props.track.vote_count });
    //   this.setState({ voteCount: this.state.voteCount += val });
    // })
    // .catch(err => {
    //   // fix handling
    //   console.log(err);
    // });

  }

  render() {

    const { voted } = this.state
    const { title, artist, vote_count } = this.props.track
    const voteUp = (
      <div>
        <div className="triangle-up" onClick={() => this.handleVote(1)}></div>
        <span className="voteCount">{vote_count}</span>
        <div className="triangle-down" onClick={() => this.handleVote(-1)}></div>
      </div>
    )

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
        //   <div>
        //  <div>
        //     {this.props.track.title} - {this.props.track.artist}
        //     <div>
        //       <input type="button" value="Up" disabled={this.state.voted === 1} onClick={() => this.vote(1)}/>
        //       <input type="button" value="Down" disabled={this.state.voted === -1} onClick={() => this.vote(-1)}/>
        //       {this.state.voteCount}
        //     </div>
        //   </div>
        // </div>