import { require } from '$lib/server/createRequire.js'

// const stream = require('youtube-audio-stream')
const ytdl = require("ytdl-core");


export const GET = async (event) => {




// await	ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
// 	  .pipe(fs.createWriteStream('video.mp4'));

	// const rangeHeader = event.request.headers || null
	//
	// 	console.log(rangeHeader)
	//
	//const streamURL = 'https://youtu.be/aqz-KE-bpKQ'
	const streamURL = 'https://youtu.be/8iNfiNbG70Y?list=RD8iNfiNbG70Y&t=60'

		try {

			const resp = new Response()

			//console.log(resp)

			var stream = ytdl(streamURL, {
		    quality: "highestaudio",
		    filter: "audioonly",
		  }).pipe(resp);

	  } catch (err) {
	    console.error(err)

			//const resp = new Response()

	    if (!resp.headersSent) {
	      // resp.writeHead(500)
	      // resp.end('internal system error')
	    }
	  }
}
