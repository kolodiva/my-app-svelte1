import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	//console.log(event.request)
	//console.log(event.request.headers.get('connid'))
//console.log(event.request)

	const connid = event.url.searchParams.get('id')

	//const connid = event.request.headers.get('connid')

	const guid = event.params.id

	//console.log(connid)

	let result
	let sql;

	//
	try {

			sql = `SELECT * from getnomenkls($1);`

			result = await query(sql, [ JSON.stringify({guid, connid}) ])

			return json(result.rows)

		} catch (message) {

			throw error(400, message)

	}

}
