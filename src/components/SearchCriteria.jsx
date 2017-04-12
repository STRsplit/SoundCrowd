import React from 'react';
import AppBar from 'material-ui/AppBar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import SongEntry from './SongEntry.jsx';
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const SongGenreSection = ({ songs }) => (
  
  <div>
  <Dropdown
    label="Title"
  >
  {songs.map((song, idx) => (
        <DropdownItem>
        <div>
          <SongEntry songInfo={song} addSong={(e) => this.addSongToPlaylist(e)} images={song.album.images}/>
        </div>
        </DropdownItem>
    ))};
  </Dropdown>
  </div>
);

export default SongGenreSection;