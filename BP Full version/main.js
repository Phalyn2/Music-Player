let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("previous");
let btn_random_reapeat = 'sequential'
let isShuffle = false;
let isRepeat = false;
let isLoop = false;
let cari = ''

let songs = [
  {
    songName: "Payphone - Maroon 5",
    filePath: "payphone.mp3",
    coverPath: "payphone.jpg",
    urlShare: 'https://youtu.be/KRaWnd3LJfs?si=_MAsWvgMrpKqrFNq',
    timestamp: '04:39'
  },
  { songName: "Unstoppable - Sia",
  filePath: "sia.mp3",
  coverPath: "sia.jpg",
  urlShare: 'https://youtube.com/?s=sia',
  timestamp: '04:06'
},
  {
    songName: "Thunder - Imagine Dragons",
    filePath: "thunder.mp3",
    coverPath: "thunder.jpg",
    urlShare: 'https://youtube.com/?s=thunder',
    timestamp: '03:07'
  },
  {
    songName: "Without You - Avici",
    filePath: "avici.mp3",
    coverPath: "avici.jpg",
    urlShare: 'https://youtube.com/?s=avici',
    timestamp: '03:01'
  },
  {
    songName: "Friend - Marshmello",
    filePath: "friend.mp3",
    coverPath: "friend.jpg",
    urlShare: 'https://youtube.com/?s=friend',
    timestamp: '03:22'
  },
  {
    songName: "Dumes - Guyonwaton X Wawes",
    filePath: "dumes.mp3",
    coverPath: "dumes.jpg",
    urlShare: 'https://youtube.com/?s=dumes',
    timestamp: '05:13',
  },
  {
    songName: "Sanes - Guyonwaton X Denny Caknan",
    filePath: "sanes.mp3",
    coverPath: "sanes.jpg",
    urlShare: 'https://youtube.com/?s=sanes',
    timestamp: '05:41'
  },
  {
    songName: "Pingal - Ngatmombilung",
    filePath: "pingal.mp3",
    coverPath: "pingal.jpg",
    urlShare: 'https://youtube.com/?s=pingal',
    timestamp: '05:00'
  },
  {
    songName: "Silhoutte - Kanaboon",
    filePath: "silhoutte.mp3",
    coverPath: "kanaboon.jpg",
    urlShare: 'https://youtube.com/?s=kanaboon',
    timestamp: '03:58'
  },
  {
    songName: "Kanashimi Wo Yasashisa Ni  - Little By Little",
    filePath: "kanashimi.mp3",
    coverPath: "kanashimi.jpg",
    urlShare: 'https://youtube.com/?s=kanashimi',
    timestamp: '04:12'
  },
];

function tampilkan_lagu() {
  let semua_lagu_html = ''
  for (let i = 0; i < songs.length; i++) {
    let lagu = songs[i]
    let judul_lagu = lagu.songName.toLowerCase()

    if(!judul_lagu.includes(cari.toLocaleLowerCase())) {
      continue
    }

    semua_lagu_html += `
    <div class="songItem" onclick="playSpecificSong(${i})">
      <img src="${lagu.coverPath}" />
      <span class="songName">${lagu.songName}</span>
      <span class="songlistplay"><span class="timestamp">${lagu.timestamp}
          <i id="${i}" class="far songItemPlay fa-play-circle"></i> </span></span>
    </div>
    `
  }

  document.getElementById('songItemContainer').innerHTML = semua_lagu_html
}
tampilkan_lagu()

function cari_lagu() {
  cari = document.getElementById('kotak-cari').value
  tampilkan_lagu()
}

const updateSongUI = () => {
  masterSongName.innerText = songs[songIndex].songName;
  myProgressBar.value = 0;
  audioElement.src = 'music/'+songs[songIndex].filePath;
};

const playSong = () => {
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};

const pauseSong = () => {
  audioElement.pause();
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;
};

const playNextSong = () => {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length)
  } else
    songIndex = (songIndex + 1) % songs.length;

  updateSongUI();
  playSong();
};

const playPrevSong = () => {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length)
  } else
    songIndex = (songIndex - 1 + songs.length) % songs.length;

  updateSongUI();
  playSong();
};

const playSpecificSong = (index) => {
  songIndex = index;
  updateSongUI();
  playSong();
};

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    pauseSong();
  }
});

audioElement.addEventListener("timeupdate", () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 1000;
  myProgressBar.value = progress;

  const currentMinutes = Math.floor(audioElement.currentTime / 60);
  const currentSeconds = Math.floor(audioElement.currentTime % 60);
  const durationElement = document.getElementById("duration");
  durationElement.innerText = `${currentMinutes}:${currentSeconds}`;
});

myProgressBar.addEventListener("input", () => {
  const seekTime = (myProgressBar.value / 1000) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

nextButton.addEventListener("click", () => {
  playNextSong();
});

prevButton.addEventListener("click", () => {
  playPrevSong();
});

songItems.forEach((element, index) => {
  element.addEventListener("click", () => {
    playSpecificSong(index);
  });
});


const volumeSlider = document.getElementById("volumeSlider");
const muteButton = document.getElementById("mute");

volumeSlider.addEventListener("input", () => {
  audioElement.volume = volumeSlider.value / 100;
});

muteButton.addEventListener("click", () => {
  if (audioElement.muted) {
    audioElement.muted = false;
    muteButton.classList.remove("fa-volume-mute");
    muteButton.classList.add("fa-volume-up");
  } else {
    audioElement.muted = true;
    muteButton.classList.remove("fa-volume-up");
    muteButton.classList.add("fa-volume-mute");
  }
});

updateSongUI();
playSong();

audioElement.addEventListener("ended", () => {

  if (isRepeat) {
    updateSongUI();
    playSong();
    return
  }

  playNextSong();
});

document.getElementById('shuffle').addEventListener('click', () => {
  if(isShuffle) {
    document.getElementById('shuffle').style.color = '#36e2ec'
  } else {
    playNextSong()
    document.getElementById('shuffle').style.color = 'blue'
  }
  isShuffle = !isShuffle
})

document.getElementById('repeat').addEventListener('click', () => {
  if(isRepeat) {
    document.getElementById('repeat').style.color = '#36e2ec'
  } else {
    document.getElementById('repeat').style.color = 'blue'
  }
  isRepeat = !isRepeat
})

document.getElementById('btn-share').addEventListener('click', () => {
  alert('Share keteman')
  window.location.href = 'whatsapp://send?text='+songs[songIndex]['urlShare']
})

