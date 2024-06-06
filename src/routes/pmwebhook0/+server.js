import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { require } from '$lib/server/createRequire.js'

const { OrangeData, Order } = require('node-orangedata');
const { OrangeDataError } 	= require('node-orangedata/lib/errors');

const CryptoJS = require("crypto-js");

const fs 		= require('fs');
const path 	= require('path');
const util 	= require('util');

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const POST = async ({ request }) => {

	const params = await request.json()

	const cert = fs.readFileSync(path.join(__dirname, './keys/client.crt'));
	const key = fs.readFileSync(path.join(__dirname, './keys/client.key'));
	const passphrase = '1234';
	const ca = fs.readFileSync(path.join(__dirname, './keys/cacert.pem'));
	const privateKey = fs.readFileSync(path.join(__dirname, './keys/private_key.pem'));
	const apiUrl = 'https://apip.orangedata.ru:12001/api/v2';

	const agent = new OrangeData({ apiUrl, cert, key, passphrase, ca, privateKey });

	let status;


	try {

		const order = new Order({
		  id: `${params.check.id}`,
		  inn: `${params.check.inn}`,
			key: `${params.check.key}`,
		  type: 1, // Приход
		  taxationSystem: 0, // Общая
			customerContact: "kolodiva@mail.ru",
		});

		order
  .addPosition({
    text: 'Петля накладная MF-201А, Slide-on с евровинтом',
    quantity: 1,
    price: 22.51,
    tax: 1,
    paymentMethodType: 4,
    paymentSubjectType: 1,
  })
	.addPayment({ type: 2, amount: 22.51 });

		await agent.sendOrder(order);

	} catch (error) {
	if (error instanceof OrangeDataError) {
		// OrangeData errors contains additional info in `errors` property of type Array
		console.log(error.message, error.errors);
	}
	// general errors handling
	}

	await sleep(500);

	try {
  	status = await agent.getOrderStatus(`${params.check.inn}`, `${params.check.id}`);
  if (status) {
		// Документ успешно обработан, status содержит данные документа
    //console.log(status);
  } else {
    // Документ создан и добавлен в очередь на обработку, но еще не обработан
		//console.log(status);
  }
} catch (error) {
  if (error instanceof OrangeDataError) {
    // OrangeData errors contains additional info in `errors` property of type Array
    console.log(error.message, error.errors);
  }
  // general errors handling
}

	 //return json({'res' : path.join(__dirname, '..', 'lib') }, {status: 200});
	// return json({'res' : status }, {status: 200});
	return json({'res' : status }, {status: 200});


}
