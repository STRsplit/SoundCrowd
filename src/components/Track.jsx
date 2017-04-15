import React, { Component } from 'react';
import axios from 'axios';
import SongEntry from './SongEntry.jsx';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // track: null,
      voteCount: this.props.track.vote_count,
      voted: null
    };
  }

  vote(val) {
    var voteStatus = this.state.voted;
    this.setState({ voted: val });
    axios.post('/api/vote/', {
      vote: val,
      playlistId: this.props.playlist,
      songId: this.props.track.song_id
    })
    .then(res => {
      // this.setState({ voteCount: this.props.track.vote_count });
      this.setState({ voteCount: this.state.voteCount += val });
    })
    .catch(err => {
      // fix handling
      console.log(err);
    });
  }

  render() {
    const { track } = this.props
    return (
      <div>
      <div className="track-main-container">
        <div>
          <div>
            {this.props.track.title} - {this.props.track.artist}
            <div>
              <input type="button" value="Up" disabled={this.state.voted === 1} onClick={() => this.vote(1)}/>
              <input type="button" value="Down" disabled={this.state.voted === -1} onClick={() => this.vote(-1)}/>
              {this.state.voteCount}
            </div>
          </div>
        </div>
        <Row>
          <Col xs={2}>
          <div className="track-vote-container">
              <div className="track-vote-container-inner">
                <span className="voteCount">{this.state.voteCount}</span>
                <div>
                  <input  type="button" value="Up" disabled={this.state.voted === 1} onClick={() => this.vote(1)}/>
                  <input type="button" value="Down" disabled={this.state.voted === -1} onClick={() => this.vote(-1)}/>
                </div>
              </div>
            </div>
          </Col>
          <Col xs>
            <div className="song-entry-header">
              <h3>{track.title}</h3>
            </div>
          </Col>
        </Row>
          <div className="song-entry-container">
            <Row middle="xs" around="xs">
              <Col xs>
              </Col>
              <Col xs>
                <div className="song-entry-inner-details">
                  {track.artist}
                </div>
              </Col>
            </Row>
            </div>
            <br />
      </div>
      <div>
        <Divider />
      </div>
    </div>
    )
  }
}

export default Track;