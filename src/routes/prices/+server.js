import { require } from '$lib/server/createRequire.js'

import { json, error } from '@sveltejs/kit'
import { getPrice } from '$lib/server/getData.js'

const { Parser } = require('json2csv');

export const GET = async (event) => {

	const safe_id = event.url.searchParams.get('id')
	const ondate 		= event.url.searchParams.get('ondate')

	// console.log(safe_id, ondate);

	if (!ondate) {
		return json(['no data'])
	}

	try {

			const response = await getPrice(safe_id, ondate);

			if (response.length === 0) {
					return json(['no data'])
			}

				const fields = Object.keys(response[0]);

				//console.log(fields);

				 const json2csv = new Parser({ fields,  delimiter: '\t', encoding: 'utf8' });
				 const csv = await json2csv.parse(response);

				 //return {status: 200, body: {'dddd' : 'ffffff'}}

				 //console.log(csv)

				 const resp = new Response (csv, {
					 status: 200,
					 headers: {
						 'Content-Type' : 'text/csv',
						 "Content-Disposition": "attachment; filename = prices.csv"
					 },
				 } );

				 //console.log(resp);

				 return resp

		} catch (message) {

			throw error(400, message)

	}

}
