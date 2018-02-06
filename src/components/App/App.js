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
                     {id: 23456, artist: "Billy Joel", album: "Album2", name: "Song2"}] };
    //this.searchSpotify = this.searchSpotify.bind(this);
  }

/*
  searchSpotify(query){
    Spotify.search(query)

  }
*/


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />   //add prop   searchSpotify={this.searchSpotify}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist searchResults={this.state.searchResults}  />  //?jj added props here
          </div>
        </div>
      </div>
    );
  }
}

export default App;
