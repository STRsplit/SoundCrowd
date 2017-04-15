import React, { Component } from 'react';
import Playlist from '../Playlist.jsx';

// export default class PlaylistRoute extends Component {
//   console.log()
//   render () {
//     return (<Playlist playlist={this.props.match.params.playlistId} owner={this.props.owner} />)
//   }
// }
const PlaylistRoute = ({ match }) => (

  <Playlist playlist={match.params.playlistId} />

);

export default PlaylistRoute;