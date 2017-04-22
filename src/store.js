import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware'
import playlists from './reducers/playlistsReducer';
import playlist from './reducers/playlistReducer';
import filters from './reducers/filtersReducer';
import user from './reducers/userReducer';

export default createStore(
  combineReducers({
    playlists,
    playlist,
    filters,
    user
  }),
  {},
  applyMiddleware(promise())
);

// FOR DEV
// applyMiddleware(createLogger(), promise())

// FOR PRODUCTION
// applyMiddleware(promise())
