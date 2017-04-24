const initialState = {
  playlists: [],
  loading: false
};

const playlistsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PLAYLISTS':
      state = {
        ...state,
        playlists: action.payload
      };
      break;
    case 'SET_LOADING':
      state = {
        ...state,
        loading: action.payload
      };
      break;
  }
  return state;
};

export default playlistsReducer;