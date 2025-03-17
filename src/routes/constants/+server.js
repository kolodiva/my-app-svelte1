import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	const params = await request.json()

			const sql = `SELECT get_constants() AS "getConstants";`

			const result = await query(sql)

			const {getConstants} = result.rows[0]

			return json(getConstants)
}
