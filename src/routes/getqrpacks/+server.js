import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { SECRET_KEY1 } from '$env/static/private'

export const GET = async (event) => {

	const safe_id = event.url.searchParams.get('id')

	if (SECRET_KEY1 !== safe_id) {
		return json([])
	}


			const sql = `SELECT get_qrprints() AS "getQRPacks";`

			const result = await query(sql)

			const {getQRPacks} = result.rows[0]

			return json(getQRPacks)
}
