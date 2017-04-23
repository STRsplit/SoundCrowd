import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware'
import playlists from './reducers/playlistsReducer';
import playlist from './reducers/playlistReducer';
import filters from './reducers/filtersReducer';
import user from './reducers/userReducer';
import search from './reducers/searchReducer';

export default createStore(
  combineReducers({
    playlists,
    playlist,
    filters,
    user,
    search
  }),
  {},
  applyMiddleware(createLogger(), promise())
);

/* * CHANGE LINE 19 DEPENDING IF DEV OR PRODUCTION * *

FOR DEV
applyMiddleware(createLogger(), promise())

FOR PRODUCTION
applyMiddleware(promise())

* * CHANGE LINE 19 DEPENDING IF DEV OR PRODUCTION * */ 