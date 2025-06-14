
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const playBtnImg = playBtn.querySelector('img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const currentTimeEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const trackList = document.getElementById('trackList');
const cover = document.getElementById('cover');

const songs = [
    {
        title: "Kyon",
        file: "song1.mp3",
        cover: "song1.jpg"
    },
    {
        title: "Kashmir Main Tu kanyakumari",
        file: "song2.mp3",
        cover: "song2.jpg"
    },
    {
        title: "Aapko Dekh Kar Dekhta Rah Gaya",
        file: "song3.mp3",
        cover: "song3.jpg"
    },
    {
        title: "Line Without a Hook",
        file: "song4.mp3",
        cover: "song4.jpg"
    },
    {
        title: "Sapphire",
        file: "song5.mp3",
        cover: "song5.jpg"
    },
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    audio.src = `assets/${song.file}`;
    cover.src = `assets/${song.cover}`;
}


let isPlaying = false;

function playSong() {
    isPlaying = true;
    audio.play();
    playBtnImg.src = './assets/pause.png'; // or "Pause"
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtnImg.src = './assets/play.png'; // or "Play"
}

// Toggle on click
playBtn.addEventListener('click', function () {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    if (audio.duration) {
        const current = audio.currentTime;
        const duration = audio.duration;

        // Update width of progress bar
        const percent = (current / duration) * 100;
        progress.value = percent;

        // Update time display
        currentTimeEl.textContent = formatTime(current);
        durationEl.textContent = formatTime(duration);
    }
}
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function populatePlaylist() {
    trackList.innerHTML = ''; // Clear old list
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;

        

        // Click to play this song
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
            populatePlaylist(); // Refresh playlist UI
        });

        trackList.appendChild(li);
    });
}


loadSong(currentSongIndex);

populatePlaylist();


audio.addEventListener('ended', nextSong);

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

progress.addEventListener('input', function () {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);




