const setPlaylists = (playlists) => {
  return {
    type: 'SET_PLAYLISTS',
    payload: playlists
  };
};

export {
  setPlaylists
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