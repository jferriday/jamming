import React from 'react';
import './App.css';
import {Playlist} from "./Playlist/Playlist.js";
import {SearchBar} from "./SearchBar/SearchBar.js";
import {SearchResults} from "./SearchResults/SearchResults.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        {name: 'name3', artist: 'artist3', album: 'album3', id: 3}],

      playlistName: 'My Playlist',

      playlistTracks: [
        {name: 'playname1', artist: 'playartist1', album: 'playalbum1', id: 4},
        {name: 'playname2', artist: 'playartist2', album: 'playalbum2', id: 5},
        {name: 'playname3', artist: 'playartist3', album: 'playalbum3', id: 6}
      ],
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
      trackURIs.push(track.name)
    })
  }

  search(searchTerm) {
    console.log(searchTerm);
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
