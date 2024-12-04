
const songs = [
    {
        songName: "Drive breakbeat",
        songPath: "../data/track1.mp3",
        imagePath: "../assets/icons/music-icon.svg",
        artist: "Rockot",
        year: 2023,
    },
    {
        songName: "Titanium",
        songPath: "../data/track2.mp3",
        imagePath: "../assets/icons/music-icon.svg",
        artist: "AlisiaBeats",
        year: 2023,
    },
    {
        songName: "Science Documentory",
        songPath: "../data/track3.mp3",
        imagePath: "../assets/icons/music-icon.svg",
        artist: "Lexin Music",
        year: 2023,
    },
    {
        songName: "Once In Paris",
        songPath: "../data/track4.mp3",
        imagePath: "../assets/icons/music-icon.svg",
        artist: "Pumpupthemind",
        year: 2023,
    },
];


const songList = document.getElementById("song-list");
const thumbnail = document.getElementById("thumbnail");
const playPauseBtn = document.getElementById("play-pause");
const restartBtn = document.getElementById("restart");
const stopBtn = document.getElementById("stop");
const progress = document.getElementById("progress");
const currTime = document.getElementById("current-time");
const volumeControl = document.getElementById("volume");
const leftTime = document.getElementById("time-left");
const trackTitle = document.getElementById("player-title");
const trackDescription = document.getElementById("player-description");


let currentSongIndex = 0;
loadSong(currentSongIndex);

const updatePlayPauseButton = () => {

}

function playPause() {
    if (audio.paused) {
        audio.play();
        updatePlayPauseButton(true);
    } else {
        audio.pause();
        updatePlayPauseButton(false);
    }
}


let audio = new Audio();
document.createElement("audio")
function loadSong(index) {
    const currentSong = songs[index];
    audio.src = currentSong.src;
    thumbnail.src = currentSong.thumbnail;
    trackTitle.innerText = currentSong.title;
    trackDescription.innerText = currentSong.artist;
    leftTime.textContent = "00:00";
}

function restart() {
    audio.currentTime = 0;
    progress.value = 0;
}

function stopTrack() {
    audio.currentTime = 0;
    audio.pause();
}



