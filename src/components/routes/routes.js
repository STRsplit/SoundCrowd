import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Playlists from '../Playlists.jsx';
import Playlist from '../Playlist.jsx';
import SearchContainer from '../SearchContainer.jsx'; 

const privateRoutes = ( 
  <Switch>
    <Route exact path="/" component={ Playlists } />
    <Route path="/search" component={ SearchContainer } />
    <Route path="/playlist/:playlistId" component={ Playlist } />
  </Switch>
);

const publicRoutes = ( 
  <Switch>
    <Route path="/public/search" component={ SearchContainer } />
    <Route path="/public/playlist/:playlistId" component={ Playlist } />  
  </Switch>
);

export {
  privateRoutes,
  publicRoutes
};
