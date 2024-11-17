
import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN_MFC_TCD } from '$env/static/private';

export const POST = async ({request}) => {


	//console.log(resAI);

	//return new Response( resAI );
	//return new Response( 'Done');
	let botMessage;
	let response;
	let chatId;
	let msg;
	let sql;

	let pass;

	botMessage = 'Есть контакт'
	chatId = undefined

	try {

		msg = await request.json()

		// sql = `insert into commands(chat_id, info, tmperror) values($1, $2, $3)`;
		//
		// await query(sql, [ 111111111, '/mimoerr', msg ])

		pass = msg?.message?.text?.toLowerCase()?.trim()

		botMessage 	= '/asktcd' + " " + pass
		chatId 		= msg?.message?.chat?.id

	} catch (message) {
		msg = 'no params'
	}

	if (!botMessage || !chatId) {
  		throw error(400, 'no data')
	}

	//
	try {

		if (pass=="5118") {

			sql = `SELECT upsertcheckpointprice($1) AS "upsertcheckpointprice";`
			//sql = `insert into checkpointprices(chat_id) values($1)`;

			await query(sql, [ chatId ])

		} else {


			//sql = `SELECT upserttask($1) AS "upserttaskResult";`
			sql = `insert into commands(chat_id, info) values($1, $2)`;

			await query(sql, [ chatId, botMessage ])

			//const result = await query(sql, [ JSON.stringify([ chatId, botMessage ])

			//const {upserttaskResult} = result.rows[0]

			//console.log(upserttaskResult)
			//return new Response('Done')
		}

		} catch (message) {

			console.log(message);

			throw error(400, message)
	}

	try {

		const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN_MFC_TCD}/sendMessage`

		const res = await axios.post(TELEGRAM_URI, {
				 chat_id: chatId,
				 text: pass=="5118" ? "Вас понял, Все готово...":"Задача добавлена"
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
