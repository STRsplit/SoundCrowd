var SpotifyWebApi = require('spotify-web-api-node');

var spotify = new SpotifyWebApi({
  clientId : '169b6e558aea4f4a8725d2ad38382923',
  clientSecret : '6c36dcc5feca4ac7bc2f86523af306d8',
  redirectUri : 'http://localhost:3000/auth/spotify/callback'
});


module.exports.searchFor = (req, res) => {
  const { name, filter } = req.query

  spotify.searchTracks(`${filter}:${name}`)
  .then(function(data) {
    let { items } = data.body.tracks;
    res.send(items)
  }, function(err) {
    console.error(err);
  });
}


// module.exports.search = search;

