const setPlaylist = (playlist) => {
  return {
    type: 'SET_PLAYLIST',
    payload: playlist
  };
};

const setPlaylistId = (id) => {
  return {
    type: 'SET_PLAYLIST_ID',
    payload: id
  };
};

const setPlaylistTracks = (tracks) => {
  return {
    type: 'SET_PLAYLIST_TRACKS',
    payload: tracks
  };
};

const setPlaylistOwner = (owner) => {
  return {
    type: 'SET_PLAYLIST_OWNER',
    payload: owner
  };
};

export {
  setPlaylist,
  setPlaylistId,
  setPlaylistTracks,
  setPlaylistOwner
};

/* * EG. FOR ASYNC FUNCTIONS * *
const setPlaylistIdAsync = (playlistId) => {
  return {
    type: 'SET_PLAYLIST_ID',
    payload: new Promise((resolve, reject) => {
      resolve(playlistId);
    })
  }
};
* * EG. FOR ASYNC FUNCTIONS * */