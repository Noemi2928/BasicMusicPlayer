const songList= [
    {
        title: 'Urban Lifestyle',
        artist: 'FiftySounds',
        image: 'img/urban-lifestyle.jpg',
        attribution: 'Música de https://www.fiftysounds.com/es/',
        src: 'music/Urban Lifestyle.mp3'
    },
    {
        title: 'Solitude',
        artist: 'Luca Francini',
        image: 'img/solitude.jpg',
        attribution: 'Música de https://pixabay.com/es/users/lucafrancini-19914739/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=197737',
        src: 'music/solitude.mp3'
    },
    {
        title: 'Spirit of Fire',
        artist: 'FiftySounds',
        image: 'img/spirit-of-fire.jpg',
        attribution: 'Música de https://www.fiftysounds.com/es/',
        src: 'music/Spirit of Fire.mp3'
    },
    {
        title: 'Password Infinity',
        artist: 'Evgeny Bardyuzha',
        image: 'img/password-infinity.jpg',
        attribution: 'Música de https://pixabay.com/es/users/evgeny_bardyuzha-25235210/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=123276',
        src: 'music/password-infinity.mp3'
    },
    {
        title: 'Electric Fiels',
        artist: 'FiftySounds',
        image: 'img/electric-field.jpg',
        attribution: 'Música de https://www.fiftysounds.com/es/',
        src: 'music/Electric Fields - FiftySounds.mp3'
    }
];

let listPosition = 0;

const songTitle = document.querySelector('.player h1');
const songArtist = document.querySelector('.player h2');
const listInfo = document.querySelector('.player h3');
const songImage = document.getElementById('songImage');

const song = document.getElementById('song');
const progress = document.getElementById('progressBar');
const actTime = document.querySelector('.container p.actualTime');
const endTime = document.querySelector('.container p.finalTime');

const previous = document.querySelector('.controls button.previous');
const startButton = document.getElementById('start-pause');
const startPauseIcon = document.querySelector('#start-pause i');
const next = document.querySelector('.controls button.next');

const randomSong = document.querySelector('.controls button.random');
let isRandom = false;
const repeatSong = document.querySelector('.controls button.repeatOne');

function songInfo(){
    songTitle.textContent = songList[listPosition].title;
    songArtist.textContent = songList[listPosition].artist;
    songImage.style = 'background-image: url('+songList[listPosition].image+');'
    song.src = songList[listPosition].src;
    song.addEventListener('loadeddata', function(){
        let endMin = Math.floor(song.duration/60);
        let endSec = Math.floor(song.duration%60);
        endTime.textContent = `${padTo2Digits(endMin)}:${padTo2Digits(endSec)}`;
    });
    listInfo.textContent = 'REPRODUCIENDO '+(listPosition+1)+' DE '+ songList.length;
};

startButton.addEventListener('click', playPause);

function playPause(){
    if(song.paused){
        startSong();
    } else {
        pauseSong();
    }
}

function startSong(){
    song.play();
    startPauseIcon.classList.add('bi-pause-fill');
    startPauseIcon.classList.remove('bi-play-fill');
    songImage.classList.add('rotate');
};

function pauseSong(){
    song.pause();
    startPauseIcon.classList.remove('bi-pause-fill');
    startPauseIcon.classList.add('bi-play-fill');
    songImage.classList.remove('rotate');
};

song.addEventListener('timeupdate', ()=>{
    let progPercent = (song.currentTime/song.duration)*100;
    if(!song.paused){
        progress.value = progPercent;
    }
    let currentMin = Math.floor(song.currentTime/60);
    let currentSec = Math.floor(song.currentTime%60);
    actTime.textContent = `${padTo2Digits(currentMin)}:${padTo2Digits(currentSec)}`;
});

song.addEventListener('ended', ()=>{
    nextSong();
});

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

progress.addEventListener('input', ()=>{
    let progPercent = (progress.value/100)*song.duration;
    song.currentTime = progPercent;
});

repeatSong.addEventListener('click', ()=>{
    if(!song.loop){
        song.loop = true;
        repeatSong.style = 'color: white;';
    } else {
        song.loop = false;
        repeatSong.style = 'color: rgb(175, 0, 35);';
    }
});

next.addEventListener('click', ()=>{
    nextSong();
});

function nextSong(){
    if(isRandom){
        listPosition = Math.floor(Math.random()*songList.length);
    }else{
        listPosition = (listPosition+1) % songList.length;
    }
    songInfo();
    startSong();
};

previous.addEventListener('click', ()=>{
    listPosition = (listPosition-1 + songList.length) % songList.length;
    songInfo();
    startSong();
});

randomSong.addEventListener('click', ()=>{
    isRandom = !isRandom;
    if(isRandom){
        randomSong.style = 'color: white;';
    }else{
        randomSong.style = 'color: rgb(175, 0, 35);';
    }
});

songInfo();