import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { require } from '$lib/server/createRequire.js'
const CryptoJS = require("crypto-js");

import { SECRET_KEY, API_KEY_RAIF } from '$env/static/private';

export const POST = async ({ request }) => {

const params = await request.json()

const hash1 = request.headers.get('x-api-signature-sha256');

const nonce = `${params.transaction.amount}|000003148440001-48440001|${params.transaction.orderId}|${params.transaction.status.value}|${params.transaction.status.date}`;

const hash = CryptoJS.HmacSHA256(nonce, API_KEY_RAIF);
const hash2 = CryptoJS.enc.Hex.stringify(hash);

// console.log(hash2);

if (hash1 !== hash2) {
		return json({'res':'niht ok Bro'}, {status: 500});
	}

	const sql = `SELECT raifpaymentscallback($1);`

	const result = await query(sql, [ params ])

	const data = result.rows[0];

	// console.log(data.raifpaymentscallback.status);

	if (data.raifpaymentscallback.status === 'Ok') {
			return json({'res':'ok'}, {status: 200});
	} else {
		return json({'res':'niht ok Bro'}, {status: 500});
	}
}
