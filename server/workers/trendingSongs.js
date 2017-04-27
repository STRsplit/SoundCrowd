const cron = require('node-cron');
const dbHelpers = require('../../database/dbHelpers');

module.exports = io => {
  // let task = cron.schedule('*/3 * * * *', () => {
  let task = cron.schedule('*/7 * * * * *', () => {
    // get all playlists with connected sockets
    // console.log('all rooms', io.sockets.adapter.rooms);
    // dbHelpers.getTrendingTracks(playlistId)
    // .then(tracks => {
    //   io.sockets.in(playlistId).emit('trending', tracks);
      
    // });
  });

  return task;
}