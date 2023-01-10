import { require } from '$lib/server/createRequire.js'
// import { getStatShort } from '$lib/server/getData.js'
const Jimp = require('jimp')
const jsQR = require('jsqr')

//const Koder = require('@maslick/koder');
import javascriptBarcodeReader from 'javascript-barcode-reader'

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
					 text: 'нужна фотка штрих-кода а не вот это все...'
				 })

			return new Response('Done')

			//console.log('no data')
	  		throw error(400, 'no data')
		}

		const photo = photos[photos.length - 1]

		//console.log(photo)
		botMessage = photo.file_id

		const TELEGRAM_URI_FILE = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/getFile?file_id=${botMessage}`

		const res = await axios.get(TELEGRAM_URI_FILE)

		//console.log(res)

		const url = `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/${res?.data?.result?.file_path}`

		 const image = await Jimp.read(url)
     // a bit of preprocessing helps on QR codes with tiny details
     image.normalize()
     image.scale(2)

		 // const value = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height)

		javascriptBarcodeReader({
  /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
  image: {data: image.bitmap.data, width: image.bitmap.width, height: image.bitmap.height},
  barcode: 'code-39',
  // barcodeType: 'industrial',
  options: {
    // useAdaptiveThreshold: true // for images with sahded portions
    // singlePass: true
  }
})
  .then(code => {
		botMessage = code;
    console.log(code)
  })
  .catch(err => {
    console.log(err)
  })

		// const image = await Jimp.read(url)
    // // a bit of preprocessing helps on QR codes with tiny details
    // image.normalize()
    // image.scale(2)
		//
		// // const value = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height)
		// //
		// // if (value) {
    // //     botMessage = value.data || String.fromCharCode.apply(null, value.binaryData)
    // // } else {
		// // 		botMessage = 'преобразование НЕ вышло!!!'
		// // }
		//
		// const koder = await new Koder().initialized;
		//
		// const value = koder.decode(image.bitmap.data, image.bitmap.width, image.bitmap.height)

		// console.log(value)
		//
		// if (value) {
    //     botMessage = value
    // } else {
		// 		botMessage = 'преобразование НЕ вышло!!!'
		// }

	} catch (message) {

		msg = 'no params'
		//console.log('ошибка преобразования QR в текст')
	}

	if (!botMessage || !chatId) {
		//console.log('no data2')
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
