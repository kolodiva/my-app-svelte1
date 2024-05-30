import { query } from '$lib/server/getData.js'

//import * from 'cookie'

// import { json, error } from '@sveltejs/kit';

export async function load({params}) {

	 //console.log(params)
		const payid = params.id

		const sql = `SELECT * FROM raifpayments WHERE paymentid=$1 and (sum_payed is null or sum_payed = 0);`

		const result = await query(sql, [ payid ])

		const data = result.rows[0];

    return data;
}

// export const GET = async (event) => {
//
// 	// event.request.headers.value.map((pos) => {
// 	//console.log(event.request.path)
// 	// })
// 	//console.log(event.request.headers.get('cookie').replace('connectionid=', ''))
// 	//console.log(event.request.headers.get('connid'))
//
// 	//const connid = event.url.searchParams.get('connid')
// 	//const connid = event.request.headers.get('Hostes')
//
// 	const payid = event.params.id
//
// 	//console.log(connid)
//
// 	let result
// 	let sql;
//
// 	//adObmupuc2vlU6s6NNBipUjfjIUqe8
// 	try {
//
// 			sql = `SELECT * FROM raifpayments WHERE paymentid=$1;`
//
// 			result = await query(sql, [ payid ])
//
// 			const data = json(result.rows);
//
// 			return data;
//
// 		} catch (message) {
//
// 			throw error(400, message)
//
// 	}
//
// }
