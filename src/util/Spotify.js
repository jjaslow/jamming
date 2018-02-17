const clientID = "f47a6c90ecd44472b626f2d8a6b068e2";
//const redirectURI = "http://jaslow.com/jammming";
const redirectURI = "http://localhost:3000"; //for local testing
const scope =
  "&scope=playlist-read-private%20playlist-modify-private%20playlist-modify-public";
let spotifyToken = "";
const baseURI = "https://api.spotify.com";

const Spotify = {
  getAccessToken() {
    if (spotifyToken) {
      return spotifyToken;
    }
    const currentURL = window.location.href;
    let getToken = currentURL.match(/access_token=([^&]*)/);
    let findExpry = currentURL.match(/expires_in=([^&]*)/);
    if (getToken && findExpry) {
      spotifyToken = getToken[1];
      let spotifyExpry = findExpry[1];
      window.history.pushState("Access Token", null, "/jammming"); //just slash for localhost
      window.setTimeout(() => (spotifyToken = ""), spotifyExpry * 1000);
      return spotifyToken;
    }
    window.location.href =
      "https://accounts.spotify.com/authorize?client_id=" +
      clientID +
      "&response_type=token&redirect_uri=" +
      redirectURI +
      scope;
  },

  search(term) {
    Spotify.getAccessToken();
    //let url = baseURI + '/v1/search?type=track&q=' + term;
    let url = `${baseURI}/v1/search?type=track&q=${term}`;
    console.log(url);
    return fetch(url, { headers: { Authorization: `Bearer  ${spotifyToken}` } })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(x => ({
            id: x.id,
            artist: x.artists[0].name,
            album: x.album.name,
            name: x.name,
            URI: x.uri
          }));
        }
        return [];
      });
  },

  savePlaylist(playListName, tracks) {
    Spotify.getAccessToken();
    //  if(!name || tracks.length < 1)
    //  {
    //    return;
    //  }
    console.log(playListName);
    console.log(tracks);
    let user_id = "";
    let playlist_id = "";

    //let url = `${baseURI}/v1/users/${user_id}/playlists`;
    //return fetch(url, {headers: {Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`} })

    fetch(`${baseURI}/v1/me`, {
      headers: {
        Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`
      }
    })
      .then(response => response.json())
      .then(response => {
        user_id = response.id; //get user profile ID
        return fetch(`${baseURI}/v1/users/${user_id}/playlists`, {
          method: "POST",
          headers: {
            Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`
          },
          body: JSON.stringify({ name: playListName })
        }); //create pl and get ID
      })
      .then(response => response.json())
      .then(response => {
        playlist_id = response.id;
        fetch(
          `${baseURI}/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`
            },
            body: JSON.stringify({ uris: tracks })
          }
        );
      });
  }

  /////
};
export default Spotify;
