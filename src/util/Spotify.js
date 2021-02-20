import { SearchBar } from "../Components/SearchBar/SearchBar";


let accessToken;
const clientID = 'c0a8505b6ba34e04b8b9edd6f54e42da'
const redirectUri = 'http://localhost:3000'

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            console.log('found an access token')
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        console.log('Access token match:  ' + accessTokenMatch)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch !== null && expiresInMatch !== null) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear parameters to get new access token when it expires
            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = "https://accounts.spotify.com/authorize?client_id="+clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectUri
            window.location = accessUrl;
            
            
    }

    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);   
        console.log('Searching for:', term)  
        return await fetch("https://api.spotify.com/v1/search?type=track&q="+term,{
            headers: {
            Authorization: `Bearer ${accessToken}`
            }

    

    }).then(response => {
        console.log(response)
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }else{
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        })
    },
    
    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs){
            return;
        }
        console.log(trackURIs, playlistName)
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userId;
        return await fetch('https://api.spotify.com/v1/me', {headers: {Authorization: 'Bearer ' + accessToken}})
        
        .then(response => {
            console.log('getting user id', response)
            return response.json()})
        .then(jsonResponse => {
            console.log(jsonResponse.id)
            userId = jsonResponse.id;
            console.log('User ID: ',userId)
            // working up to here
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                method: 'POST',
                headers: {Authorization: `Bearer ${accessToken}`, "Content-type": 'application/json'},
                body: JSON.stringify({name: playlistName})
            }).then(response => {return response.json}
            ).then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
                    headers: {Authorization: `Bearer: ${accessToken}`, "Content-type": "application/json"},
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                })
            })
        })

    }
}
export default Spotify;