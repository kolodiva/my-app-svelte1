import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN } from '$env/static/private';

export const POST = async ({request}) => {

	// console.log(axios.isCancel('something'));

	let messageText;
	let chatId;

	const msg = await request.json()

	messageText = msg?.text?.toLowerCase()?.trim()
	chatId = msg?.chat?.id

	// console.log('chatId');
	// console.log(chatId);
	// console.log(messageText);

	if (!messageText || !chatId) {
  		throw error(400, 'no data')
	}

	try {
			const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`
			//return json(chatId)
			await axios.post(TELEGRAM_URI, {
			    chat_id: chatId,
			    text: messageText
			  })

				return new Response( 'Done', {status: 200})


		} catch (message) {

			throw error(400, message)

	}

}
