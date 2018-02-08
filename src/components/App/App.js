import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      searchResults: [{id: 12345, artist: "Billy Joel", album: "Album1", name: "Song1"},
                     {id: 23456, artist: "Billy Joel", album: "Album2", name: "Song2"}],
      playlistTracks: [{id: 912345, artist: "Lea Michele", album: "Cannonball", name: "Song8"},
                     {id: 923456, artist: "Lea Michele", album: "Cannonball", name: "Song9"}],
      playlistName : "Jason's Playlist #"
                   };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    //this.searchSpotify = this.searchSpotify.bind(this);
  }

/*
  searchSpotify(query){
    Spotify.search(query).then(response => this.setState({searchResults: response}));

  }
*/

  addTrack(track){
       let searchResultsIds = this.state.searchResults.map(x => x.id);
       let searchResultsPosition = searchResultsIds.indexOf(track.id);

       let playlistTracksIds = this.state.playlistTracks.map(x => x.id);
       let playlistTracksPosition = playlistTracksIds.indexOf(track.id);

       if (playlistTracksPosition<0)
       {
        this.setState(
          {
            playlistTracks: this.state.playlistTracks.push(this.state.searchResults[searchResultsPosition]),
            searchResults: this.state.searchResults.splice(searchResultsPosition, 1)
          });
        console.log(this.state.searchResults);
        console.log(this.state.playlistTracks);
      }


  }

  removeTrack(track){

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />   {/*add prop   searchSpotify={this.searchSpotify}*/}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
