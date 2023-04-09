import { query } from '$lib/server/getData.js'

//import * from 'cookie'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	// event.request.headers.value.map((pos) => {
	//console.log(event.request.path)
	// })
	//console.log(event.request.headers.get('cookie').replace('connectionid=', ''))
	//console.log(event.request.headers.get('connid'))

	//const connid = event.url.searchParams.get('connid')
	const connid = event.request.headers.get('Hostes')

	// const guid = event.params.id
	//const guid = 'zamki_i_zashelki'

	//console.log(connid)

	let result
	let sql;

	//
	try {

			sql = `SELECT * from getbasket($1);`

			result = await query(sql, [ JSON.stringify({connid}) ])

			return json(result.rows)

		} catch (message) {

			throw error(400, message)

	}

}
