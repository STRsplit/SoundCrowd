import React, { Component } from 'react';
import Playlist from '../Playlist.jsx';

const PlaylistRoute = ({ match }) => (

  <Playlist playlist={match.params.playlistId} />
);

export default PlaylistRoute;