import React, { Component } from 'react';
import axios from 'axios';

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
    this.props.setOwner(false);
    var voteStatus = this.state.voted;
    this.setState({ voted: val });
    axios.post('/api/vote/', {
      vote: val,
      playlistId: this.props.playlist,
      songId: this.props.track.song_id
    })
    .then(res => {
      // this.props.getPlaylistTracks();
      // this.render();
      this.setState({ voteCount: this.props.track.vote_count });
      if (voteStatus !== null) {
        // if (val === 1) val = 2;
        // else if (val === -1) val = -2;
      }
      this.setState({ voteCount: this.state.voteCount += val });
      this.props.sortTracks();
      // this.props.renderTracks() ???
    })
    .catch(err => {
      // fix handling
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        {this.props.track.title} - {this.props.track.artist}
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