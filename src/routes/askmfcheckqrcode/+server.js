import { require } from '$lib/server/createRequire.js'
// import { getStatShort } from '$lib/server/getData.js'
const Jimp = require('jimp')
const jsQR = require('jsqr')

import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN_MFC_CHECK_QR } from '$env/static/private';

export const POST = async ({request}) => {

	let botMessage;
	let response;
	let chatId;
	let msg;

	botMessage = 'Есть контакт'
	chatId = undefined

	try {
		msg = await request.json()

		const photos = msg?.message?.photo

		chatId = msg?.message?.chat?.id

		if (!photos || photos.length == 0) {

			const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/sendMessage`

			const res = await axios.post(TELEGRAM_URI, {
					 chat_id: chatId,
					 text: 'no photos'
				 })

			return new Response('Done')

			console.log('no data')
	  		throw error(400, 'no data')
		}

		const photo = photos[photos.length - 1]

		console.log(photo)

		botMessage = photo.file_id

		chatId = msg?.message?.chat?.id

	} catch (message) {

		msg = 'no params'
		console.log(message)
	}

	if (!botMessage || !chatId) {
		console.log('no data2')
  		throw error(400, 'no data')
	}

	//
	try {

		const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/sendMessage`

		const res = await axios.post(TELEGRAM_URI, {
				 chat_id: chatId,
				 text: botMessage
			 })

		return new Response('Done')

				// const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${botMessage}`;
				// const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${chatId}&text=${botMessage}`
				//
        // const res = await fetch(TELEGRAM_URI);
        // return await res.json();

		} catch (message) {
console.log('no data3')
			throw error(400, 'message2')

	}

}
