# spotify-visual-app

Live: [https://spotify-visual-app.herokuapp.com]

An experiment in visualizing Spotify listening trends for an individual user! Additionally fetches lyrics and info about artists. Still in progress :)

## About

- Cloned from [spotify-react-router-auth](https://github.com/kauffecup/spotify-react-router-auth), which is used as a base for Spotify user authentication.
- Created with React + Redux, Node.js, and Express.js.
- Utilizes APIs from [Spotify](https://developer.spotify.com/documentation/web-api/), [Last.fm](https://www.last.fm/api), and [Genius](https://docs.genius.com).

## Setup

For development, create a `.env` file, using `.env.dev.example` for reference. These keys are necessary to connect to APIs.
Note: It may be necessary to use port 8888 for express server and callback.

```bash
$ npm install
```

## Running

There are three scripts - `start`, `dev`, and `build`.

To run the production bundle:

```bash
$ npm run build
$ npm start
```

To run in dev mode (with hot reloading, and un-minified source maps):

```bash
$ npm run dev
```

Open [http://localhost:3000] to view it in the browser.
