import React, { Component } from 'react';
import Playlist from '../Playlist.jsx';

export default class PlaylistRoute extends Component {
  render () {
    return (<Playlist playlist={this.props.match.params.playlistId} owner={false} />)
  }
}