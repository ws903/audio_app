const link = 'https://www.youtube.com/watch?v=KfXvjxbRhZk'

function fetchSong(link) {
	const id = link.split('=')[1]
	const key = 'AIzaSyBEgPkKkUzYcRYR3mL5_LPbdGlrB2Nv2L8'
	const url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&part=snippet,statistics,contentDetails"

	fetch(url)
	.then(resp => resp.json())
	.then(function(json) {
		addSongToHtml(json)
	})
}

function addSongToHtml(song) {
	const response = song.items[0]['snippet']
	const title = response.title
	const artist = title.split(' - ')[0]

	const id = link.split('=')[1]
	const playLink = `https://www.youtube.com/embed/${id}`

	const ul = document.querySelector('#song-list')
	const li = document.createElement('li')
	li.innerText = title
	ul.appendChild(li)

	const dlBtn = document.querySelector('#dl-btn')
	dlBtn.src = `https://www.download-mp3-youtube.com/api/?api_key=MzM3NDE0NTY2&format=mp3&video_id=${id}`
	debugger

	// li.addEventListener('click', function() {
	// 	const player = document.querySelector('#audio-player')
	// 	// debugger
	// 	// const source = player.querySelector('source')
	// 	// debugger
	// 	player.src = `${playLink}`
	// 	// player.src = `${playLink}`
	// })
}

fetchSong(link)