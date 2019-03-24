const client_id = '85a6448ca4f841c5a6566d782c9bc50b';
const scopes = 'user-modify-playback-state';
const redirect_uri = 'https://rohanupponi.com';
let me = null;

let authRequestWindow;

function authorize() {
    authRequestWindow = window.open(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=600,height=400');

    window.spotifyCallback = (payload) => {
        authRequestWindow.close();
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${payload}`
            }
        }).then(response => {
            me = response.headers.toString();
            return response.json();
        }).then(data => {
            console.log(me);
        });
    }
}

function hello() {
    console.log("Hello world!");
    console.log(me);
}

function mounted() {
    this.token = window.location.hash.substr(1).split('&')[0].split("=")[1]

    if (this.token) {
        window.spotifyCallback(this.token);
    }
}

