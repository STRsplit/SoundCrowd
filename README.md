# Project Name

> SoundCrowd - Social jukebox

## Team

  - [Eugene Penaranda](https://github.com/epenaranda007)
  - [Laura Greenbaum](https://github.com/lgbaum)
  - [JJ Gutierrez](https://github.com/jjwatt99)
  - [Steven Reed](https://github.com/Streed12)

## Table of Contents

1. [Introduction](#Introduction)
    1. [About](#about)
    1. [How to Use](#howto)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
    1. [Built With](#builtwith)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [Acknowledgements](#acknowledgements)

## Introduction 
### About
 SoundCrowd - a social jukebox application that extends Spotify's platform enabling multiple users to vote on the track order of a playlist. 

 Upon signing in, users are presented with a list of their Spotify playlists. Users then select one of their playlists, or use our playlist generator to enable realtime voting on the track order of that playlist. Once the playlist owner is ready to start the first song, a one-click "play" button from the screen initializes the playlist on Spotify and begins reordering the playlist's tracks based on vote count. 

 Any user with the playlist's custom URL can access the voting system, however, users are limited to one vote per track (voter is able to change their mind once ie if they vote up, but meant down they can edit their vote and vice versa). All users see the tracks reorder to reflect vote count in realtime on their screens and the actual Spotify playlist reorders once every 10 seconds.

 Once the current track has finished, the highest voted song is queued up and the prior song is placed back into the voting system with a vote count of 0. 

 All users can add songs to the playlist using our in-app Spotify search feature. Autocompleted search functionality and filter capability allow users to add songs to the playlist while remain in our application - no back and forth navigation from SoundCrowd to Spotify. A convenient side bar shows users the most recently added and played songs so they are privvy to changes.

 SoundCrowd was engineered to help enhance Spotify's already amazing application of which we are all fans and users. Their continued support and extension of their API affords our application a great deal of room to grow. Some of the features we are excited to work on include: 
- Song addition filters set by playlist owner
- Reverting playlist to original
- Locking of next song in queue
- Trending songs showing voting patterns
- Simpler song change mechanism (Spotify "end of song" hook API addition would make it much simpler)

### How to Use
...
## Usage
> 

## Requirements

- Node 6.4
- Redis 2.6
- MySQL 2.13

## Development

### Built With
- Databases: [MySQL](https://www.mysql.com/), [Redis (session)](https://redis.io/)
- Server: [Node](https://nodejs.org/) w/ [Express JS](https://expressjs.com) Framework
- Framework: [ReactJS](https://facebook.github.io/react/) w/ [Redux](http://redux.js.org/)

### Additional Technologies
- [Axios](https://github.com/mzabriskie/axios)
- [Heroku](https://www.heroku.com/)
- [PassportJS](http://passportjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Sequelize](http://docs.sequelizejs.com/)
- [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node)
- [Socket.io](https://socket.io/)

Design:
- [Google Fonts](https://fonts.google.com/)
- [Google: Material UI (highly reworked)](http://www.material-ui.com/#/)
- [MUI CSS](https://www.muicss.com/)
- [React Flip-Move](https://github.com/joshwcomeau/react-flip-move)
- [Sass](http://sass-lang.com/)

Testing:
- [Chai](http://chaijs.com/)
- [Zombie](http://zombie.js.org/)


### Installing Dependencies

From within the root directory:

```sh
npm install
npm start (give it a second to run all tasks)

```

### Roadmap

View the project roadmap [here](LINK_TO_DOC)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Acknowledgements
- [Michael Thelin](https://github.com/thelinmichael) - Michael's [Spotify Web API Wrapper](https://github.com/thelinmichael/spotify-web-api-node) was incredibly useful for a majority of the simpler API calls our application needed to make.
- [Joshua Comeau](https://github.com/joshwcomeau) - Josh's [React Flip Move](https://github.com/joshwcomeau/react-flip-move) module brought our track reordering to life. Our front-end engineer was ecstatic he didn't have to write CSS animations for the application. 
- [React Training](https://github.com/ReactTraining) - The documentation for React-Router v4 at [ReactTraining.com](https://reacttraining.com/react-router/web/guides/quick-start) was an invaluable resource.


