import { require } from '$lib/server/createRequire.js'
// import { getStatShort } from '$lib/server/getData.js'
const Jimp = require('jimp')

const {BarcodeFormat,
    MultiFormatReader,
    DecodeHintType,
    RGBLuminanceSource,
    BinaryBitmap,
    HybridBinarizer} = require('@zxing/library')


//const jsQR = require('jsqr')

//const Koder = require('@maslick/koder');
//import javascriptBarcodeReader from 'javascript-barcode-reader'
//import Quagga from 'quagga'
//import Quagga from '@ericblade/quagga2';
//const Quagga = require('quagga').default;
// import { MultiFormatReader, BarcodeFormat, DecodeHintType, RGBLuminanceSource, BinaryBitmap, HybridBinarizer } from '@zxing/library';

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

		//const url = `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/${res?.data?.result?.file_path}.jpg`
		const url = `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN_MFC_CHECK_QR}/${res?.data?.result?.file_path}`

		  const webImg = await Jimp.read(url)
       // a bit of preprocessing helps on QR codes with tiny details
       // webImg.normalize()
       // webImg.scale(2)

			 //const qrCodeImageArray = new Uint8Array(webImg.bitmap.data.buffer);

			 //console.log(qrCodeImageArray)

			 //const buffer = await webImg.getBufferAsync(Jimp.AUTO);



			const len = webImg.bitmap.width * webImg.bitmap.height
								const luminancesUint8Array = new Uint8Array(len)
								for (let i = 0; i < len; i++) {
									luminancesUint8Array[i] = ((webImg.bitmap.data[i * 4] + webImg.bitmap.data[i * 4 + 1] * 2 + webImg.bitmap.data[
										i *
										4 + 2]) / 4) & 0xFF
								}
								const hints = new Map();
								const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX,BarcodeFormat.PDF_417,BarcodeFormat.AZTEC, BarcodeFormat.EAN_13];

								hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

								const reader = new MultiFormatReader();

								reader.setHints(hints);
// console.log('*****************************************')
// 								console.log(luminancesUint8Array)

								const luminanceSource = new RGBLuminanceSource(luminancesUint8Array, webImg.bitmap.width, webImg.bitmap.height)
								const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource))
								const decoded = reader.decode(binaryBitmap)
								//console.log(decoded)

								botMessage = decoded.text;





		 // const response = await axios.get(url, {
    	// responseType: 'arraybuffer'
  		// });

	// console.log(image)

		 // const value = jsQR(image.bitmap.data, image.bitmap.width, image.bitmap.height)



		 // await Quagga.decodeSingle({
		 //     src: url,
		 //     numOfWorkers: 0,  // Needs to be 0 when used within node
		 //     decoder: {
		 //         readers: ["ean_reader"] // List of active readers
		 //     },
			// 	 inputStream: {
     //    		size: 800  // restrict input-size to be 800px in width (long-side)
    	// 	},
		 // }, function(result) {
		 //     if(result.codeResult) {
		 //         console.log("result", result.codeResult.code);
		 //     } else {
		 //         console.log("not detected");
		 //     }
		 // });



		 // let image = new Image();
		 // image.crossOrigin = "Anonymous";
		 // image.src = url;
		 //
		 // await image.load();
		//  image.onload = function () {
// 		 javascriptBarcodeReader({
//   /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
//   //image: {data: image.bitmap.data, width: image.bitmap.width, height: image.bitmap.height},
// 	image: image.bitmap.data,
//   barcode: 'ean-13',
//   // barcodeType: 'industrial',
//   options: {
//     // useAdaptiveThreshold: true // for images with sahded portions
//     // singlePass: true
//   }
// })
//   .then(code => {
// 		botMessage = code;
//     console.log(code)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// }

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

		// msg = 'no params'
		// console.log('ошибка преобразования QR в текст')
		// console.log(message)

		botMessage = 'Штрих код не удалось распознать.'
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
