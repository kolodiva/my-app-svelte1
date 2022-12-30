import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN } from '$env/static/private';

export const POST = async ({request}) => {

	// console.log(axios.isCancel('something'));

	let messageText;
	let chatId;

	const msg = await request.json()

	botMessage = msg?.text?.toLowerCase()?.trim()
	chatId = msg?.chat?.id

	// console.log('chatId');
	// console.log(chatId);
	// console.log(messageText);

	if (!botMessage || !chatId) {
  		throw error(400, 'no data')
	}

	try {

			// const rsp = await json({
			//     chat_id: chatId,
			//     text: messageText
			//   });

			//return json(chatId)
			//await axios.post(TELEGRAM_URI, rsp)

				//return new Response( 'Done')

				// const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${botMessage}`;
				const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${chatId}&text=${botMessage}`

        const res = await fetch(TELEGRAM_URI);
        return await res.json();

		} catch (message) {

			throw error(400, message)

	}

}
