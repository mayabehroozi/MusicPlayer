

// Swiper
const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 5,
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false
  }
});


const songs = [
  { title: "Sway", name: "Dean Martin", source: "assets/music/Dean Martin Sway.mp3" },
  { title: "Hotel California", name: "Eagles", source: "assets/music/Eagles - Hotel California (320).mp3" },
  { title: "Dernière danse", name: "Indila", source: "assets/music/1. Indila - Dernière danse (128).mp3" },
  { title: "Je Veux", name: "Zaz", source: "assets/music/Zaz_Je_Veux_128.mp3" },
  { title: "Born To Die", name: "Lana Del Rey", source: "assets/music/Lana Del Rey - Born To Die (128).mp3" },
  { title: "Million Years Ago", name: "Adele", source: "assets/music/Adele - Million Years Ago (128).mp3" },
  { title: "Stargazing", name: "Myles Smith", source: "assets/music/Myles Smith - Stargazing 128 [WWW.VIPREMIX.IR].mp3" }
];

//  DOM
let currentIndex = 0;
let audio = new Audio();

const titleEl = document.querySelector(".music_player h1");
const nameEl = document.querySelector(".music_player p");
const inputRange = document.querySelector("input[type='range']");
const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-pause");
const backBtn = document.querySelector(".fa-backward");
const forwardBtn = document.querySelector(".fa-forward");

// بارگذاری آهنگ
function loadSong(index) {
  if (audio) {
    audio.pause();
    audio.src = ""; // Clear previous source
  }

  audio = new Audio(songs[index].source);
  currentIndex = index;

  titleEl.textContent = songs[index].title;
  nameEl.textContent = songs[index].name;
  inputRange.value = 0;
  inputRange.disabled = true;

  swiper.slideTo(index);

  audio.addEventListener("loadedmetadata", () => {
    inputRange.max = Math.floor(audio.duration);
    inputRange.disabled = false;
    audio.play();
    togglePlayPause(true);
  });

  audio.addEventListener("timeupdate", () => {
    inputRange.value = Math.floor(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    togglePlayPause(false);
  });
}

// کنترل ظاهر دکمه‌ها
function togglePlayPause(isPlaying) {
  playBtn.style.display = isPlaying ? "none" : "inline-block";
  pauseBtn.style.display = isPlaying ? "inline-block" : "none";
}

// کنترل‌ها
playBtn.addEventListener("click", () => {
  audio.play();
  togglePlayPause(true);
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  togglePlayPause(false);
});

inputRange.addEventListener("input", () => {
  audio.currentTime = inputRange.value;
});

backBtn.addEventListener("click", () => {
  if (currentIndex > 0) loadSong(currentIndex - 1);
});

forwardBtn.addEventListener("click", () => {
  if (currentIndex < songs.length - 1) loadSong(currentIndex + 1);
});

// کلیک روی اسلاید Swiper
swiper.on("click", function (swiper) {
  const clickedIndex = swiper.clickedIndex;
  if (clickedIndex !== undefined && clickedIndex !== currentIndex) {
    loadSong(clickedIndex);
  }
});

// اسلاید کشیدن (تغییر آهنگ)
swiper.on("slideChange", function () {
  const newIndex = swiper.realIndex;
  if (newIndex !== currentIndex) {
    loadSong(newIndex);
  }
});

// شروع
loadSong(currentIndex);


