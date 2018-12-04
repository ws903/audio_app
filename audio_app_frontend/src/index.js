const link = 'https://www.youtube.com/watch?v=R_ViOLgvsuY'

function fetch_data(link) {
	const id = link.split('=')[1]
	const key = 'AIzaSyBEgPkKkUzYcRYR3mL5_LPbdGlrB2Nv2L8'
	const url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&part=snippet,statistics,contentDetails"

	fetch(url)
	.then(resp => resp.json())
	.then(function(json) {
		const response = json.items[0]['snippet']
		const title = response.title
	})
}

fetch_data(link)