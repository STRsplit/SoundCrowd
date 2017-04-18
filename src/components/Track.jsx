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
      // track: null,
      voteCount: this.props.track.vote_count,
      voted: null
    };
    this.vote = this.vote.bind(this);
  }

  vote(val) {
    this.props.reorderPlaylist();
    // var voteStatus = this.state.voted;
    // this.setState({ voted: val });
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

    const voteUp = (
      <div>
        <div className="triangle-up" onClick={() => this.state.voted === 1 ? null : this.vote(1)}></div>
        <span className="voteCount">{this.state.voteCount}</span>
        <div className="triangle-down" onClick={() => this.state.voted === -1 ? null : this.vote(-1)}></div>
      </div>
    )

    const addToPlaylist = (
      <div>
        <FloatingActionButton style={style}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
    
    const { track } = this.props
    const actionItem = this.props.search ? addToPlaylist : voteUp

    return (
      <div>
      <div className="track-main-container">
        <div>
        </div>
        <div className="track-dual-container">

            <div className="track-vote-container">
                <div className="track-vote-container-inner">     
                   {actionItem}
                </div>
              </div>
           
            <div className="track-song-details">
              <div className="track-song-details-inner flexbox-container container">
                <div className="track-image box">
                  <img src="https://i.scdn.co/image/5487acf8d22aa518645d90135d8a9a1fed3e902e" />
                </div>
                  <div className="song-entry-header">
                    <h3>{track.title}</h3>
                    <h4>{track.artist}</h4>
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