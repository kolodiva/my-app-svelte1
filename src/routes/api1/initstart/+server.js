import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const msg = await request.json()

	const sql = `SELECT initstart($1) AS "initStartResult";`

	//console.log(msg)

	const result = await query(sql, [ JSON.stringify(msg) ])

	const {initStartResult} = result.rows[0]

	//console.log(json(initStartResult) )

	return json(initStartResult)
}
