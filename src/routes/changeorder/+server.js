import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const msg = await request.json()

	const sql = `SELECT upsertorder($1) AS "upsertorderResult";`

	const result = await query(sql, [ JSON.stringify(msg) ])

	const {upsertorderResult} = result.rows[0]

	return json(upsertorderResult)
}
