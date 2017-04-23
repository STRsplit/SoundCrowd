const initialState = {
  id: '',
  owner: '',
  tracks: [],
  recentlyAddedTracks: [],
  recentlyPlayedTracks: [],
  trendingTracks: []
};

const playlistReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PLAYLIST':
      state = {
        ...state,
        ...action.payload
      };
      break;
    case 'SET_PLAYLIST_ID':
      state = {
        ...state,
        id: action.payload
      };
      break;
    case 'SET_PLAYLIST_TRACKS':
      state = {
        ...state,
        tracks: action.payload
      };
      break;
    case 'SET_PLAYLIST_OWNER':
      state = {
        ...state,
        owner: action.payload
      };
      break;
    case 'SET_RECENTLY_ADDED_TRACKS':
      state = {
        ...state,
        recentlyAddedTracks: action.payload
      };
      break;
    case 'SET_RECENTLY_PLAYED_TRACKS':
      state = {
        ...state,
        recentlyPlayedTracks: action.payload
      };
      break;
    case 'SET_TRENDING_TRACKS':
      state = {
        ...state,
        trendingTracks: action.payload
      };
      break;
  }
  return state;
};

export default playlistReducer;

/* * EG. FOR ASYNC ACTIONS * *
case 'SET_PLAYLIST_ID_FULFILLED': 
  state = {
    ...state,
    id: action.payload
  };
  break;
* * FOR ASYNC ACTIONS * */