import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const params = await request.json()

	if (params.oper === 'initData') {

		const sql = `SELECT tg_mfcrevizorro_initstart($1) AS "initStartResult";`

		//console.log(msg)

		const result = await query(sql, [ JSON.stringify(params) ])

		const {initStartResult} = result.rows[0]

		return json(initStartResult)
	}

	if (params.oper === 'inActive') {

		const sql = `SELECT tg_mfcrevizorro_inactive($1) AS "inactiveResult";`


		// console.log(JSON.stringify(params))

		const result = await query(sql, [ JSON.stringify(params) ])

		const {inactiveResult} = result.rows[0]

		// console.log(inactiveResult)

		return json(inactiveResult)
	}


		if (params.oper === 'addNewOrder') {

			const sql = `SELECT tg_mfcrevizorro_addneworder($1) AS "addNewOrder";`

			const result = await query(sql, [ JSON.stringify(params) ])

			const {addNewOrder} = result.rows[0]

			return json(addNewOrder)
		}

		if (params.oper === 'getOrderPositions') {

			const sql = `SELECT tg_mfcrevizorro_getorderpositions($1) AS "getOrderPositions";`

			const result = await query(sql, [ params.order_guid ])

			const {getOrderPositions} = result.rows[0]

			return json(getOrderPositions)
		}

	return json({});

}
