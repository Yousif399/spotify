const getAuth = async () => {
    const clientId = '2042335fec2343a5a77e924d6519d50a';
    const clientSecret = 'a65281484c7248a48c8bf3365e47da82';
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            // Basic <base64 encoded client_id:client_secret>
            'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    const token = await response.json();
    console.log(token);
    return token

};


const getSong = async (songname, artist, token) => {
    // const token = await getAuth();
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=track:${songname}+artist:${artist}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.access_token}`
        }


    });
    // console.log(response)
    // console.log(response);
    // console.log('heyyyy');
    let data = await response.json();
    console.log('here', data.tracks.items[0]);
    return data.tracks.items[0];

}
// getSong('unholy','sam smith')


let music = [
    { id: 0, track: 'show me the meaning', artist: 'backstreet boys' },
    // { id: 0, track: 'unholy', artist: 'sam smith' },
    { id: 1, track: 'see you again', artist: 'charlie ' },
    { id: 2, track: 'hotel california', artist: 'eagles' },
    { id: 3, track: 'no promises', artist: 'shayne' },
    { id: 4, track: 'fal in love', artist: 'zimmerman' },
    { id: 5, track: 'whiskey drink', artist: 'jason' },
    { id: 6, track: 'world on fire', artist: 'nate smith' },
    { id: 7, track: '7 years', artist: 'lukas' },
    { id: 8, track: 'vienna', artist: 'billy joel' },
    { id: 9, track: 'Electric worry', artist: 'Clutch' },
    { id: 10, track: 'the painter ', artist: 'cody' },
    { id: 11, track: 'save me', artist: 'jelly roll' },
    { id: 12, track: 'tamly maak ', artist: 'amr diab' },
    { id: 13, track: 'tekdar ', artist: 'amr diab' },
    { id: 14, track: 'ana  ', artist: 'amr diab' },



];

let playing;
let stop = document.getElementById('stop');
let headertitle = document.getElementById('headertitle');


const setupTrack = async () => {
    const token = await getAuth();
    for (let i = 0; i < music.length; i++) {
        let data = await getSong(music[i].track, music[i].artist, token);
        // console.log(data);
        music[i]['preview_url'] = new Audio(data.preview_url);
        music[i]['album_cover'] = data.album.images[0].url;

        let img = document.getElementById(`${i}`);
        img.src = music[i]['album_cover'];
        img.hidden = false;


    }
}
setupTrack()

let clickEvent = (index) => {
    let track = music[index];
    console.log(track);

    if (playing && playing.preview_url && !playing.preview_url.paused) {
        if (playing === track) {
            pauseSong();
            return;
        }
        else {
            playing.preview_url.pause();
            let playingbtn = document.getElementById(`play${playing.id}`);
            playingbtn.innerHTML = 'Play';
            playingbtn.className = 'btn btn-success';
        }

    }




    // track.preview_url.play();
    // playing = track;
    // let playbutton = document.getElementById(`play${playing.id}`);
    // playbutton.innerHTML = 'Pause Track';
    // playbutton.className = 'btn btn-dark';
    // headertitle.innerHTML = `${playing.songname} | ${playing.artist}`;
    if (track.preview_url && track.preview_url instanceof HTMLAudioElement) {
        track.preview_url.play();
        playing = track;
        let playbutton = document.getElementById(`play${playing.id}`);
        playbutton.innerHTML = 'Pause Track';
        playbutton.className = 'btn btn-dark';
        headertitle.innerHTML = `${playing.track} | ${playing.artist}`;
    } else {
        console.error("Invalid or unsupported preview_url for the selected track");
    }



}
let pauseSong = () => {
    console.log('PASUing');
    playing.preview_url.pause();
    let playbtn = document.getElementById(`play${playing.id}`);
    playbtn.innerHTML = 'Play';
    playbtn.className = 'btn btn-success';

}









