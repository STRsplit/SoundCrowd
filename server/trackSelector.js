module.exports = playlists => {
  console.log('in track selector', playlists);
  var names = [];
  var chosen = [];
  var playlistId;
  for (var i = 0; i < playlists.length; i++) {
    names.push(playlists[i].name.split(' '));
    names[i].unshift(i);
  }
  if (mood === 'Happy') {
    for (var j = 0; j < names.length; j++) {
      for (var k = 0; k < names[j].length; k++) {
        if (names[j][k] === 'Good' || names[j][k] === 'Happy') {
          chosen.push(names[j]);
        }
      }
    } 
  } else if (mood === 'Calm' || mood === '') {
    for (j = 0; j < names.length; j++) {
      for (k = 0; k < names[j].length; k++) {
        if (names[j][k] === 'Relax' || names[j][k] === 'Coffeehouse' ||
            names[j][k] === 'Soft' || names[j][k] === 'Chill' || 
            names[j][k] === 'Break' || names[j][k] === 'Smooth') {
          chosen.push(names[j]);
        }
      }
    } 
  } else if (mood === 'Sad') {
    for (j = 0; j < names.length; j++) {
      for (k = 0; k < names[j].length; k++) {
        if (names[j][k] === 'Dark' || names[j][k] === 'Melancholia' || names[j][k] === 'Loss') {
          chosen.push(names[j]);
        }
      }
    } 
  } else if (mood === 'Focused') {
    for (j = 0; j < names.length; j++) {
      for (k = 0; k < names[j].length; k++) {
        if (names[j][k] === 'Brain') {
          chosen.push(names[j]);
        }
      }
    } 
  } else if (mood === 'Excited') {
    for (j = 0; j < names.length; j++) {
      for (k = 0; k < names[j].length; k++) {
        if (names[j][k] === 'Free') {
          chosen.push(names[j]);
        }
      }
    } 
  }
  var num = Math.floor(Math.random() / (1 / chosen.length));
  num = chosen[num][0];

  spotify.getPlaylist('spotify', playlists[num].id)
  .then((data) => {
    var tracks = data.body.tracks.items;
    var result = {uri: [], link: href};
    if (activity === 'Exercising' || activity === 'Partying') {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].track.popularity < 60) {
          tracks[i] = undefined;
        }
      }
    } else if (activity === 'Studying' || activity === 'Chilling' || activity === 'Driving') {
      for (i = 0; i < tracks.length; i++) {
        if (tracks[i].track.popularity < 30) {
          tracks[i] = undefined;
        }
      }
    }
    for (i = 0; i < tracks.length; i++) {
      if (result.uri.length === 90) {
        break;
      }
      if (tracks[i] !== undefined) {
        result.uri.push(tracks[i].track.uri);
      }
    }
    spotify.addTracksToPlaylist(userId, newPlaylistId, result.uri)
    .then((data) => {
      console.log('added tracks');
    }, function(err) {
      console.log('add tracks error: ', err);
    });
    res.send(result);
  });
}
