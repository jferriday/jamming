import React from 'react';
import './App.css';
import Playlist from "./Playlist/Playlist.js";
import SearchBar from "./SearchBar/SearchBar.js";
import SearchResults from "./SearchResults/SearchResults.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div id="app">
          {/* <SearchBar /> */}
          <div className="App-playlist">
            {/* <SearchResults /> */}
            {/* <Playlist /> */}
          </div>
        </div>
      </div>
    )
}
}

export default App;
