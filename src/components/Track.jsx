import React, { Component } from 'react';
import axios from 'axios';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // track: null,
      voteCount: null,
      voted: null
    };
  }

  getVoteCount() {
    // get count from DB? or passed in from props...
    this.setState({ voteCount: 10 });
  }

  vote(val) {
    var voteStatus = this.state.voted;
    this.setState({ voted: val });
    axios.post('/api/vote/', {
      vote: val,
      playlistId: this.props.playlist,
      songId: this.props.track.id
    })
    .then(res => {
      if (voteStatus !== null) {
        if (val === 1) val = 2;
        else if (val === -1) val = -2;
      }
      this.setState({ voteCount: this.state.voteCount += val });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentWillMount() {
    this.getVoteCount();
  }

  render() {
    return (
      <div>
        {this.props.track.name} - {this.props.track.artists ? this.props.track.artists[0].name : ''}
        <div>
          <input type="button" value="Up" disabled={this.state.voted === 1} onClick={() => this.vote(1)}/>
          <input type="button" value="Down" disabled={this.state.voted === -1} onClick={() => this.vote(-1)}/>
          {this.state.voteCount}
        </div>
      </div>
    )
    
  }
}

export default Track;