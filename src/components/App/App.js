import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: "Playlist Name"
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  resetAfterSave() {
    this.setState({
      playlistName: "Playlist Name"
    });
    this.setState({
      playlistTracks: []
    });
  }

  savePlaylist() {
    if (!this.state.playlistName)
    {
      alert(`You need to have a playlist name`);
      return;
    }
    if (this.state.playlistTracks.length > 0) {
      const trackURIs = this.state.playlistTracks.map(
        track => "spotify:track:" + track.id
      );
      Spotify.savePlaylist(this.state.playlistName, trackURIs);
      this.resetAfterSave();
      /*
        let spotifyToken = Spotify.getAccessToken();
        let user_id = '';

        fetch(`https://api.spotify.com/v1/me`, {headers: {Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`} }).then(response => response.json()).then(response =>
          {user_id = response.id;
          return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {method: 'POST', headers: {Authorization: `Bearer  ${spotifyToken}, Content-Type: application/json`}, body: JSON.stringify({'name': 'jason'})   })
          })
          .then(response => response.json()).then(response=>console.log(response.id));

        */
    }
  }

  searchSpotify(query) {
    Spotify.search(query).then(response =>
      this.setState({ searchResults: response })
    );
    ///////////////////////////////////////////////////////testing
  }

  addTrack(track) {
    //let searchResultsIds = this.state.searchResults.map(x => x.id);  //get track IDs of songs in Search Results for removing from results when added to playlist
    //let searchResultsPosition = this.state.searchResults.indexOf(track);  //where in search Results array is selected track?

    let tracks = this.state.playlistTracks;
    if (tracks.find(x => x.id === track.id)) {
      //is track already in playlist?
      return;
    }
    tracks.push(track); //mutate track to end of playlist
    //let searchNew = this.state.searchResults;                     //copy search results
    //searchNew.splice(searchResultsPosition, 1);                   //remove track from search results
    this.setState({
      playlistTracks: tracks
      //searchResults: searchNew
    });
    //console.log(this.state.searchResults);
    //console.log(this.state.playlistTracks);
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let playlistPosition = tracks.indexOf(track); //where in playlist array is selected track?

    let playlistNew = tracks; //copy playlist
    playlistNew.splice(playlistPosition, 1); //remove track from search results
    this.setState({
      playlistTracks: playlistNew
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  componentDidMount() {
    window.addEventListener("load", this.getAccessToken);
  }

  getAccessToken() {
    let token = Spotify.getAccessToken();
    console.log(token);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
