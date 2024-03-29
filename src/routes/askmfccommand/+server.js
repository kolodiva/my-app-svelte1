import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN_MFC_COMMANDS } from '$env/static/private';

export const POST = async ({request}) => {


	//console.log(resAI);

	//return new Response( resAI );
	//return new Response( 'Done');
	let botMessage;
	let response;
	let artikul;
	let chatId;
	let msg;
	let sql;

	botMessage = 'Есть контакт'
	chatId = undefined

	try {
		msg = await request.json()

		botMessage 	= msg?.message?.text?.toLowerCase()?.trim()
		chatId 		= msg?.message?.chat?.id

		// artikul = artikul.split(' ').join('').replace(/[^0-9]/g, '');

	} catch (message) {
		msg = 'no params'
	}

	// if (!botMessage || !chatId) {
  // 		throw error(400, 'no data')
	// }

	sql = `SELECT upserttask($1) AS "upserttaskResult";`

	//console.log(JSON.stringify({chatId, botMessage}))

	const result = await query(sql, [ JSON.stringify({chatId, botMessage}) ])

	const {upserttaskResult} = result.rows[0]

	//return json(upserttaskResult)


	try {

		const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN_MFC_COMMANDS}/sendMessage`

		const res = await axios.post(TELEGRAM_URI, {
				 chat_id: chatId,
				 text: upserttaskResult.status
			 })

		return new Response('Done')

				// const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${botMessage}`;
				// const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${chatId}&text=${botMessage}`
				//
        // const res = await fetch(TELEGRAM_URI);
        // return await res.json();

		} catch (message) {

			throw error(400, 'message2')

	}

}
