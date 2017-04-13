import React from 'react';
import AppBar from 'material-ui/AppBar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import SongEntry from './SongEntry.jsx';

const SongGenreSection = ({ songs, addSong }) => (
  <div className="searchresults-container">
    {songs.map((song, idx) => (
      <div>
        <SongEntry key={song.id} songInfo={song} addSong={addSong} images={song.album.images}/>
      </div>
    ))}
  </div>
);

export default SongGenreSection;