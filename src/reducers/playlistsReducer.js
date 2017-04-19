const initialState = {
  playlists: []
};

const playlistsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PLAYLISTS':
      state = {
        ...state,
        playlists: action.payload
      };
      break;
  }
  return state;
};

export default playlistsReducer;