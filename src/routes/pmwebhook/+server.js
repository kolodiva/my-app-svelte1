import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { SECRET_KEY } from '$env/static/private';

export const POST = async ({ request }) => {

const params = await request.json()

params.auth = request.headers.get('authorization');
params.auth2 = request.headers.get('x-api-signature-sha256');


console.log(params);
//
 //console.log(request.headers.get('authorization'));
//console.log(request);

// request.headers.value.map((pos) => {
// 	console.log(pos)
// })


//console.log(params.data || params.data.id2 || params.data.id2 === SECRET_KEY);

	// if (params.data && params.data.id2 && params.data.id2 !== SECRET_KEY) {
	// 		//console.log(params.data.id2 === SECRET_KEY);
	// 		// console.log(params.data || params.data.id2 || params.data.id2 === SECRET_KEY);
	// 		return json({'res':'noBro'});
	// }

	// const sql = `SELECT raifpayments($1) AS "raifpaymentsResult";`
	//
	// const result = await query(sql, [ params.data ]);
	//
	// const {raifpaymentsResult} = result.rows[0];

	//return json(params, {status: 200});
	return json({'res':'ok'}, {status: 200});
}
