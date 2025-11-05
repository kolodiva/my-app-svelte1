import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { SECRET_KEY1 } from '$env/static/private'

export const GET = async (event) => {

	const safe_id = event.url.searchParams.get('id')

	if (SECRET_KEY1 !== safe_id) {
		return json([])
	}

	const guid = event.url.searchParams.get('guid')

			const sql = `SELECT get_edizm_parent($1) AS "getEdizmParent";`

			const result = await query(sql, [guid])

			const {getEdizm} = result.rows[0]

			return json(getEdizm)
}
