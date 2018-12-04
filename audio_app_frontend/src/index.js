const link = 'https://www.youtube.com/watch?v=R_ViOLgvsuY'
const id = link.split('=')[1]
const key = 'AIzaSyBEgPkKkUzYcRYR3mL5_LPbdGlrB2Nv2L8'

function fetch_data(id) {
	// var url = 'https://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json-in-script&callback=?';
	var url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&part=snippet,statistics,contentDetails"

	debugger

	// $.getJSON(url, function (data) {
	// 	$('input#DataProvider_Title').val(data.entry.title.$t);
	// 	$('textarea#DataProvider_Description').val(data.entry.media$group.media$description.$t);
	// });
}

fetch_data(id)