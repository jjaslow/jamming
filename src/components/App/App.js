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
     let searchResultsIds = this.state.searchResults.map(x => x.id);  //get track IDs of songs in Search Results for removing from results when added to playlist
     let searchResultsPosition = searchResultsIds.indexOf(track.id);  //where in search Results array is selected track?

     let tracks = this.state.playlistTracks;
     if (tracks.find(x => x.id === track.id))  //is track already in playlist?
     {
       return;
     }
      tracks.push(this.state.searchResults[searchResultsPosition])  //mutate track to end of playlist
      let searchNew = this.state.searchResults;                     //copy search results
      searchNew.splice(searchResultsPosition, 1);                   //remove track from search results
      this.setState(
        {
          playlistTracks: tracks,
          searchResults: searchNew
        });
      //console.log(this.state.searchResults);
      //console.log(this.state.playlistTracks);
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
