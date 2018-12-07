const songs = [];
const poster = ["Poster1.jpg","Poster2.jpg","Poster3.jpg"];
const songTitle = document.getElementById("songTitle");
const fillBar = document.getElementById("fill");
const song = new Audio();
let currentSong = 0;
let currentPoster = 0;
const songsUrl = 'http://localhost:3000/api/v1/songs'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#song-form')
  const playlist = document.querySelector('#playlist')
  playlist.addEventListener('click', changeSongFromPL)
  fetchSongs()
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    submitSong(e.target)
  })
})

const posterCheck = id => {
  let parsedId = parseInt(id);
  if (parsedId === 1) {
      return 0;
    } else if (parsedId === 2) {
      return 1;
    } else if (parsedId === 3) {
      return 2;
    } else if ((parsedId > 3) && (parsedId % 3 === 1)) {
      return 0;
    } else if ((parsedId > 3) && (parsedId % 3 === 2)) {
      return 1;
    } else if ((parsedId > 3) && (parsedId % 3 === 0)) {
      return 2;
    }
}

const changeSongFromPL = e => {
  if (e.target.className === 'track-span') {
    let id = e.target.parentElement.dataset.id;
    currentPoster = posterCheck(id);
    currentSong = id - 1;
    selectedSong(currentSong);
    playSong();
    $("#image img").attr("src",poster[currentPoster]);
    $("#bg img").attr("src",poster[currentPoster]);
    $("#play img").attr("src","Pause.png");
  }
}

const submitSong = song => {
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
  })
  .then(resp => resp.json())
  .then(addSongToHtml)
}

const fetchSongs = () => {
  fetch(songsUrl)
  .then(resp => resp.json())
  .then(json => {
    for(const song of json) {
      addSongToHtml(song)
      songs.push(song.song_file);
    }
    let firstChild = document.querySelector('div.track-div').children[0];
    firstChild.style.color = 'red';
    playSong();
  })
}

const addSongToHtml = song => {
  const ol = document.querySelector('#playlist-list')
  ol.innerHTML += `
  <div class="track-div">
  <li data-id="${song.id}"><span class="track-span">${song.song_file}</span></li>
  </div><br>
  `
}

const playSong = () => {
  song.src = `/Users/hassanmalik/downloads/${songs[currentSong]}`;
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

song.addEventListener('timeupdate', () => {
  let fillBar = document.getElementById("fill");
  let position = song.currentTime / song.duration;
  fillBar.style.width = position * 100 +'%';
});


const next = () => {
  currentSong++;
  currentPoster++;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
    $("#playlist").animate({ scrollTop: '0' }, 500)
  }
  if (currentPoster > 2) {
    currentPoster = 0;
  }
  selectedSong(currentSong);
  playSong();
  $("#play img").attr("src","Pause.png");
  $("#image img").attr("src",poster[currentPoster]);
  $("#bg img").attr("src",poster[currentPoster]);
}

const pre = () => {
  currentSong--;
  currentPoster--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
    $("#playlist").animate({ scrollTop: '1000' }, 500)
  }
  if (currentPoster < 0) {
    currentPoster = 2
  }
  selectedSong(currentSong);
  playSong();
  $("#play img").attr("src","Pause.png");
  $("#image img").attr("src",poster[currentPoster]);
  $("#bg img").attr("src",poster[currentPoster]);
}

const displaySongInfo = () => {
  let songTitle = document.querySelector('#songTitle');
  songTitle.innerText = songs[currentSong]
}

const selectedSong = (currentSong) => {
  let trackId = currentSong + 1;
  let track = document.querySelector(`li[data-id="${trackId}"]`)
  let el;
  for (let i = 0; i < songs.length; i++) {
    el = document.querySelector(`li[data-id="${i+1}"]`)
    el.style.color = 'white';
  }
  track.style.color = 'red'
}


