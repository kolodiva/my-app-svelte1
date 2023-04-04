import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	console.log(event.params.id)

	//const guid = event.url.searchParams.get('id')
	const guid = event.params.id

	let result
	let sql;

	//
	try {

			sql = `SELECT * from getnomenkls($1);`

			result = await query(sql, [ JSON.stringify({guid}) ])

			return json(result.rows)

		} catch (message) {

			throw error(400, message)

	}

}
