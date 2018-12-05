const songs = ["/Users/hassanmalik/downloads/Boomerang by Diamond Ortiz.mp3","/Users/hassanmalik/downloads/Diamond Ortiz No Guestlist.mp3","/Users/hassanmalik/downloads/Zooted by Diamond Ortiz LYRIC VIDEO.mp3"];
        const poster = ["Poster1.jpg","Poster2.jpg","Poster3.jpg"];

        const songTitle = document.getElementById("songTitle");
        const fillBar = document.getElementById("fill");

        const song = new Audio();
        let currentSong = 0;    // it point to the current song
document.addEventListener('DOMContentLoaded', () => {
  playSong();
})
         // it will call the function playSong when window is load

        function playSong(){
            let songTitle = document.querySelector('#songTitle')

            song.src = songs[currentSong];  //set the source of 0th song
            songTitle.textContent = songs[currentSong];
       // set the title of song

            song.play();    // play the song
        }

        function playOrPauseSong(){

            if(song.paused){
                song.play();
                $("#play img").attr("src","Pause.png");
            }
            else{
                song.pause();
                $("#play img").attr("src","Play.png");
            }
        }

        song.addEventListener('timeupdate',function(){
            let fillBar = document.getElementById("fill");
            let position = song.currentTime / song.duration;

            fillBar.style.width = position * 100 +'%';
        });


        function next(){
            currentSong++;
            if(currentSong > 2){
                currentSong = 0;
            }
            playSong();
            $("#play img").attr("src","Pause.png");
            $("#image img").attr("src",poster[currentSong]);
            $("#bg img").attr("src",poster[currentSong]);
        }

        function pre(){

            currentSong--;
            if(currentSong < 0){
                currentSong = 2;
            }
            playSong();
            $("#play img").attr("src","Pause.png");
            $("#image img").attr("src",poster[currentSong]);
            $("#bg img").attr("src",poster[currentSong]);
        }



//         let mm = require('musicmetadata');

// // create a new parser from a node ReadStream
//         let parser = mm(songs[0], function (err, metadata) {
//         if (err) throw err;
//         console.log(metadata);
//         });









