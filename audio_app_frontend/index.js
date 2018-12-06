const songs = ["/Users/hassanmalik/dev/audio_app/audio_app_frontend/Boomerang-by-Diamond-Ortiz.mp3","/Users/hassanmalik/downloads/Diamond Ortiz No Guestlist.mp3","/Users/hassanmalik/downloads/Zooted by Diamond Ortiz LYRIC VIDEO.mp3"];
const poster = ["Poster1.jpg","Poster2.jpg","Poster3.jpg"];
const songTitle = document.getElementById("songTitle");
const fillBar = document.getElementById("fill");
const song = new Audio();
let currentSong = 0;

const songsUrl = 'http://localhost:3000/api/v1/songs'

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#song-form')

  fetchSongs()

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    submitSong(e.target)
  })
})

function submitSong(song) {
  const data = {
    song: {
      song_file: song.song_file.value.replace("C:\\fakepath\\", "")
    }
  }

  fetch(songsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(function(song) {
    addSongToHtml(song)
  })

  // fetchSongs()
}

function fetchSongs() {
  fetch(songsUrl)
  .then(resp => resp.json())
  .then(function(json) {
    for(const song of json) {
      addSongToHtml(song)
    }
  })
}

function addSongToHtml(song) {
  const ul = document.querySelector('#playlist-list')
  const li = document.createElement('li')
  li.setAttribute('data-song-id', song.id)
  li.innerText = song.song_file

  ul.appendChild(li)
}

const playSong = () => {
      song.src = songs[currentSong];
      displaySongInfo();
      song.play();
  }

const playOrPauseSong = () => {
      if (song.paused) {
          song.play();
          $("#play img").attr("src","Pause.png");
      }
      else {
          song.pause();
          $("#play img").attr("src","Play.png");
      }
  }

  song.addEventListener('timeupdate',function(){
      let fillBar = document.getElementById("fill");
      let position = song.currentTime / song.duration;
      fillBar.style.width = position * 100 +'%';
  });


const next = () => {
      currentSong++;
      if(currentSong > 2){
          currentSong = 0;
      }
      playSong();
      $("#play img").attr("src","Pause.png");
      $("#image img").attr("src",poster[currentSong]);
      $("#bg img").attr("src",poster[currentSong]);
  }

const pre = () => {
      currentSong--;
      if (currentSong < 0) {
          currentSong = 2;
      }
      playSong();
      $("#play img").attr("src","Pause.png");
      $("#image img").attr("src",poster[currentSong]);
      $("#bg img").attr("src",poster[currentSong]);
  }

const displaySongInfo = () => {
  let songTitle = document.querySelector('#songTitle');
  let file = songs[currentSong];

  console.log(file)
  ID3.loadTags(file, function() {

    var tags = ID3.getAllTags(file);
});
}

playSong();




