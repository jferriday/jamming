import React from 'react';
import './App.css';
import {Playlist} from "./Playlist/Playlist.js";
import {SearchBar} from "./SearchBar/SearchBar.js";
import {SearchResults} from "./SearchResults/SearchResults.js";
import Spotify from '../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],

      playlistName: 'My Playlist',

      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{
      tracks.push(track);
    }
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let trackId = track.id;
    let tracks = this.state.playlistTracks.filter((playListTrack) => {
      return playListTrack.id !== trackId;
    })
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName})
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach((track) => {
      trackURIs.push(track.uri)

      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: "New playlist",
          playlistTracks: []
        })
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(srchRes => {
      this.setState({searchResults: srchRes})
    })
  }
  

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/> 
          </div>
        </div>
      </div>
    )
}
}

export default App;
