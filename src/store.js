import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware'
import playlists from './reducers/playlistsReducer';
import playlist from './reducers/playlistReducer';
import filters from './reducers/filtersReducer';
import search from './reducers/searchReducer';

export default createStore(
  combineReducers({
    playlists,
    playlist,
    filters,
    search
  }),
  {},
  applyMiddleware(createLogger(), promise())
);

