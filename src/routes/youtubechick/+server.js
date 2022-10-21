import { require } from '$lib/server/createRequire.js'

const stream = require('youtube-audio-stream')

export const GET = async (event) => {
	try {
	    for await (const chunk of stream('https://youtu.be/8j5YBZ-c2uU')) {
				const resp = new Response (chunk );

				return resp
	    }
	  } catch (err) {
	    console.error(err)
	    if (!res.headersSent) {
	      res.writeHead(500)
	      res.end('internal system error')
	    }
	  }
}
