const setPlaylist = playlist => {
  return {
    type: 'SET_PLAYLIST',
    payload: playlist
  };
};

const setPlaylistId = id => {
  return {
    type: 'SET_PLAYLIST_ID',
    payload: id
  };
};

const setPlaylistTracks = tracks => {
  return {
    type: 'SET_PLAYLIST_TRACKS',
    payload: tracks
  };
};

const setPlaylistOwner = owner => {
  return {
    type: 'SET_PLAYLIST_OWNER',
    payload: owner
  };
};

const setRecentAddedTracks = tracks => {
  return {
    type: 'SET_RECENTLY_ADDED_TRACKS',
    payload: tracks
  };
};

const setRecentPlayedTracks = tracks => {
  return {
    type: 'SET_RECENTLY_PLAYED_TRACKS',
    payload: tracks
  };
};

const setTrendingTracks = tracks => {
  return {
    type: 'SET_TRENDING_TRACKS',
    payload: tracks
  };
};

const setVoteErrorPopup = (visible, message) => {
  return {
    type: 'SET_VOTE_ERROR_POPUP',
    payload: {visible, message}
  }
}

export {
  setPlaylist,
  setPlaylistId,
  setPlaylistTracks,
  setPlaylistOwner,
  setRecentAddedTracks,
  setRecentPlayedTracks,
  setTrendingTracks,
  setVoteErrorPopup
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