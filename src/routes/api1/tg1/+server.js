import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const params = await request.json()

	if (params.oper === 'initData') {

		return json({none: "none"});

		const sql = `SELECT tg_mfcrevizorro_initstart($1) AS "initStartResult";`

		//console.log(msg)

		const result = await query(sql, [ JSON.stringify(params) ])

		const {initStartResult} = result.rows[0]

		return json(initStartResult)
	}

	if (params.oper === 'inActive') {

		return json({none: "none"});

		const sql = `SELECT tg_mfcrevizorro_inactive($1) AS "inactiveResult";`


	//	console.log(JSON.stringify(params))

		const result = await query(sql, [ JSON.stringify(params) ])

		const {inactiveResult} = result.rows[0]

		return json(inactiveResult)
	}

	return json({none: "none"});

}
