import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { SECRET_KEY } from '$env/static/private';

export const POST = async ({request}) => {

const params = await request.json()

	if (params && params.id2 && params.id2 !== SECRET_KEY) {
			//console.log(params.data.id2 === SECRET_KEY);
			// console.log(params.data || params.data.id2 || params.data.id2 === SECRET_KEY);
			return json({'res':'noBro'});
	}

	const sql = `select * from raifpaymentslist($1);`

	const result = await query(sql, [ params.ids ]);

	return json(result.rows);
}
