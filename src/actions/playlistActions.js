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

const setRecentTracks = (tracks) => {
  return {
    type: 'SET_RECENT_TRACKS',
    payload: tracks
  };
};

export {
  setPlaylist,
  setPlaylistId,
  setPlaylistTracks,
  setPlaylistOwner,
  setRecentTracks,
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