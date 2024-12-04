document.addEventListener("DOMContentLoaded", function () {
    // Your list of songs
    const songs = [
        {
            title: "Drive breakbeat",
            duration: "1:49",
            thumbnail: "../assets/icons/music-icon.svg",
            src: "../data/track1.mp3",
            artist: "Rockot",
            year: 2023,
        },
        {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "../assets/icons/music-icon.svg",
            src: "../data/track2.mp3",
            artist: "AlisiaBeats",
            year: 2023,
        },
        {
            title: "Science Documentory",
            duration: "2:07",
            thumbnail: "../assets/icons/music-icon.svg",
            src: "../data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
        },
        {
            title: "Once In Paris",
            duration: "2:12",
            thumbnail: "../assets/icons/music-icon.svg",
            src: "../data/track4.mp3",
            artist: "Pumpupthemind",
            year: 2023,
        },
    ];

    // Getting access to dom elements
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

    // To store index of track being played 
    let currentSongIndex = 0;
    // Audio constructor
    let audio = new Audio();
    loadSong(currentSongIndex);

    const updatePlayPauseButton = (paused) => {
        // Path added in src is with repect to location of index.html file 
        playPauseBtn.innerHTML = paused
            ? '<img src="../assets/icons/play-button.svg" />'
            : '<img src="../assets/icons/pause-button.svg" />';
    }

    // To play pause the track
    function playPause() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseButton(true);
        } else {
            audio.pause();
            updatePlayPauseButton(false);
        }
    }

    // To highlight currently playing track in the list 
    function updateCurrentSongHighlight() {
        // Remove highlight from all titles
        const titleElements = document.querySelectorAll(".track-title");
        titleElements.forEach((element) => {
            element.classList.remove("current-song");
        });

        const currentSongTitleElement = document.querySelector(
            `.item-container[data-index="${currentSongIndex}"] .track-title`
        );

        if (currentSongTitleElement) {
            currentSongTitleElement.classList.add("current-song");
        }
    }

    // To play a track using Audio
    function loadSong(index) {
        const currentSong = songs[index];
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.innerText = currentSong.title;
        trackDescription.innerText = currentSong.artist;
        leftTime.textContent = "00:00";
        audio.addEventListener("loadedmetadata", function () {
            progress.max = audio.duration;
        });
        updateCurrentSongHighlight(index);
    }

    // To restart a track
    function restart() {
        audio.currentTime = 0;
        progress.value = 0;
    }

    // Stop track
    function stopTrack() {
        audio.currentTime = 0;
        audio.pause();
    }

    function padZero(number) {
        return (number < 10 ? "0" : "") + number;
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    // Called periodically to update the progress on track 
    function updateProgress() { 
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        // Calculate remaining time
        const remainingTime = duration - currentTime;
        progress.value = currentTime;
        currTime.textContent = `${formatTime(currentTime)}`;
        leftTime.textContent = `${"-" + (remainingTime >= 0 ? formatTime(remainingTime) : "00:00")
            }`;

        throttledUpdateProgress = null;
    }

    function updateVolume() {
        audio.volume = volumeControl.value;
    }

    // To render list of songs in left menu from given array 
    function renderSongList() {
        // Clear existing list
        songList.innerHTML = "";

        // Render songs dynamically
        songs.forEach((song, index) => {
            // Create elements for each song
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackArtist = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
            trackArtist.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            // Set attributes and content
            itemContainer.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audio.play();
                updatePlayPauseButton();
            });

            imgElement.src = "../assets/icons/outline.svg";
            trackTitle.textContent = song.title;
            trackArtist.textContent = song.artist || "Unknown Artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            // Append elements to the container
            itemImg.appendChild(imgElement);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackArtist);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
            updateCurrentSongHighlight(currentSongIndex);
        });
    }

    renderSongList();

    // Attached event listners to DOM elements
    playPauseBtn.addEventListener("click", playPause);
    restartBtn.addEventListener("click", restart);
    stopBtn.addEventListener("click", stopTrack);
    progress.addEventListener("input", function () {
        audio.currentTime = progress.value;
    });
    volumeControl.addEventListener("input", updateVolume);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", () => updatePlayPauseButton(true));
    audio.addEventListener("pause", () => updatePlayPauseButton(false));
});
