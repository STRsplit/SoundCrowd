const setPlaylists = playlists => {
  return {
    type: 'SET_PLAYLISTS',
    payload: playlists
  };
};

const setLoading = loading => {
  return {
    type: 'SET_LOADING',
    payload: loading
  };
};

export {
  setPlaylists,
  setLoading
};

/* * EG. FOR ASYNC FUNCTIONS * *
const setPlaylistsAsync = (playlists) => {
  return {
    type: 'SET_PLAYLISTS',
    payload: new Promise((resolve, reject) => {
      resolve(playlists);
    })
  }
};
* * EG. FOR ASYNC FUNCTIONS * */