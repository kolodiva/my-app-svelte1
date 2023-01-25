import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	// http://62.109.14.230/getbitrixclients?id=149bcd2e-89d0-4545-91bb-2efbd3a9


	const safe_id = event.url.searchParams.get('id')

	if (safe_id !== '149bcd2e-89d0-4545-91bb-2efbd3a9') {
		throw error(400, 'autorization yok!')
	}

	let result
	let sql;

	//
	try {

		// const {data} = await axios.get('https://mf-docs.ru/services/src/php/btx_companies.php?psw=5c84d91c-7b17-4449-8313-a9bf313af9bb');

		//console.log(data[5])

		//return new Response(JSON.stringify(data[10]))

			 //const response = await getStatDocSales(safe_id);

			//sql = `SELECT * from insertbitrixid($1);`
			// result = await query(sql, [ JSON.stringify(data) ])

			sql = `SELECT * from getbitrixclients();`
			result = await query(sql)

			// console.log(JSON.stringify(result.rows))

	    // const {insertbitrixidResult} = result.rows

			//console.log([JSON.stringify(data[5])])

			//return json(insertbitrixidResult)
			return json(result.rows)

		} catch (message) {

			throw error(400, message)

	}

}
