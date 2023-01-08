import { require } from '$lib/server/createRequire.js'
const { Configuration, OpenAIApi } = require("openai");

import { OPENAI_API_KEY } from '$env/static/private';


import { json, error } from '@sveltejs/kit';
import axios from 'axios';
import { TELEGRAM_API_TOKEN } from '$env/static/private';

export const POST = async ({request}) => {


	//console.log(resAI);

	//return new Response( resAI );
	//return new Response( 'Done');

	let botMessage;
	let chatId;
	let msg;

	botMessage = 'Есть контакт'
	chatId = undefined

	try {
		msg = await request.json()

		botMessage 	= 'Ответ Артамона. Сам ты: ' + msg?.message?.text?.toLowerCase()?.trim()
		chatId 		= msg?.message?.chat?.id

	} catch (message) {
		msg = 'no params'
	}

	if (!botMessage || !chatId) {
  		throw error(400, 'no data')
	}

	const configuration = new Configuration({
  	apiKey: OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	let completion;

	try {
	  completion = await openai.createCompletion({
	    model: "text-davinci-003",
	    prompt: botMessage,
			max_tokens: 1000,
	  });
	  //console.log(completion.data.choices[0].text);
		//console.log(completion.data);
	} catch (error) {

	  if (error.response) {
	    // console.log(error.response.status);
	    // console.log(error.response.data);
			throw error(400, error.response.data)
	  } else {
	    // console.log(error.message);
			throw error(400, error.message)
	  }
	}

	//
	const resAI = completion.data.choices[0].text;



	try {

		const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`

		const res = await axios.post(TELEGRAM_URI, {
				 chat_id: chatId,
				 text: resAI
			 })

		return new Response( 'Done')

				// const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${botMessage}`;
				// const TELEGRAM_URI = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${chatId}&text=${botMessage}`
				//
        // const res = await fetch(TELEGRAM_URI);
        // return await res.json();

		} catch (message) {

			throw error(400, message)

	}

}
