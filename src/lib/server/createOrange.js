import { require } from '$lib/server/createRequire.js'

const { OrangeData, Order } = require('node-orangedata');
const { OrangeDataError } 	= require('node-orangedata/lib/errors');

const fs 		= require('fs');
const path 	= require('path');

function getOrderObj() {

  const pathtokey = path.resolve('src/lib/server/keys');

  const cert         = fs.readFileSync( path.join(pathtokey, 'client.crt') );
  const key          = fs.readFileSync( path.join(pathtokey, 'client.key') );
  const passphrase   = '1234';
  const ca           = fs.readFileSync(path.join( path.join(pathtokey, 'cacert.pem' )));
  const privateKey   = fs.readFileSync(path.join( path.join(pathtokey, 'private_key.pem')));

  const apiUrl       = 'https://apip.orangedata.ru:12001/api/v2';

  const agent = new OrangeData({ apiUrl, cert, key, passphrase, ca, privateKey });

  return agent;

}

export async function createCheck(params) {

  // console.log(params.content.positions);
  // console.log(params.content.checkClose.payments);

  const agent = getOrderObj();

  //console.log(params.content.positions);

  try {

    const order = new Order({
		  id: params.id,
		  inn: params.inn,
			key: params.key,
		  type: params.content.type, // Приход 1
		  taxationSystem: params.content.checkClose.taxationSystem, // Общая 0
			customerContact: params.content.customerContact,
		});

    //console.log('11111111111111111111111')

    params.content.positions.forEach((item, i) => {
      order.addPosition(item)
    });

    params.content.checkClose.payments.forEach((item, i) => {
      order.addPayment(item);
    });
    //
    //console.log(order)


    //
		await agent.sendOrder(order);

	} catch (error) {

    let msgError;

    if (error instanceof OrangeDataError) {


		    // OrangeData errors contains additional info in `errors` property of type Array
        console.log('11111111111111111111111');
        console.log(error);
		      console.log(error.message, error.errors);
          msgError = error.message + " " + (error.errors ? error.errors : "");
          //console.log(msgError);
	       } else {
           msgError = error;
         }
	       return {error: true, msg: msgError} // general errors handling
	}

  return {error: false, msg: 'Чек ККМ создан'};
}

/////////
export async function statusCheck(params) {

  //console.log(params);

  const agent = getOrderObj();

  //let status;

	//await sleep(400);

	try {

    const status = await agent.getOrderStatus(`${params.inn}`, `${params.id}`);



    if (status) {
		// Документ успешно обработан, status содержит данные документа
    //console.log(status);
      return status;
    } else {
    // Документ создан и добавлен в очередь на обработку, но еще не обработан
		//console.log(status);
    return {error: true}
    }
} catch (error) {

  let msgError;

  if (error instanceof OrangeDataError) {
    // OrangeData errors contains additional info in `errors` property of type Array
    //console.log(error.message + ' ' + error.errors);
    msgError = error.message + " " + (error.errors ? error.errors : "");

  } else {
    msgError = error;
  }
  // general errors handling
  return {error: true, msg: msgError}
}

}
