import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

import { createCheck, statusCheck } from '$lib/server/createOrange.js'

import { require } from '$lib/server/createRequire.js'

const CryptoJS = require("crypto-js");

import { SECRET_KEY, API_KEY_RAIF } from '$env/static/private';

function statusCheckPromise(params) {

  return new Promise((resolve, reject) => {

    setTimeout(async() => {

      const status = await statusCheck(params);

      //console.log(status);
			let sql;

      if (status && status.error) {

        sql = `update raifpayments set check_status='ERROR', checkcallback=($2)  where guid=($1) AND (check_status = 'ERROR' OR check_status is null OR check_status = '') ;`

      	query(sql, [ params.id, status ])

      } else {

        sql = `update raifpayments set check_status='"SUCCESS"', checkcallback=($2) where guid=($1) ;`

        query(sql, [ params.id, status ])
      }
    }, 5*1000)
  });
}

/////////////////////////////////////////////
export const POST = async ({ request }) => {

const params = await request.json()

const hash1 = request.headers.get('x-api-signature-sha256');

//тест
//const nonce = `${params.transaction.amount}|000003148440001-48440001|${params.transaction.orderId}|${params.transaction.status.value}|${params.transaction.status.date}`;

const nonce = `${params.transaction.amount}|000001793199001-93199001|${params.transaction.orderId}|${params.transaction.status.value}|${params.transaction.status.date}`;


const hash = CryptoJS.HmacSHA256(nonce, API_KEY_RAIF);
const hash2 = CryptoJS.enc.Hex.stringify(hash);

//console.log(hash2);
if (params.cottore && params.cottore === 'cottore') {
} else {

  if (hash1 !== hash2) {
		return json({'res':'niht ok Bro, hash hash'}, {status:500});
	}
}

	let sql, result;

	//регистрруем Оплату и берем в ответе табл чакст ьдля чека
	sql = `SELECT raifpaymentscallback($1);`

	result = await query(sql, [ params ])

	const data = result.rows[0];

  //console.log(data.raifpaymentscallback.check);

	if (data.raifpaymentscallback.status === 'Ok') {

    //пока временно без чека так как при его печати какие то ошибки и его нужно уже отлавливать Постманом
    //return json({'res': data.raifpaymentscallback.check}, {status: 200});

		//
		result = await createCheck(data.raifpaymentscallback.check);

	  if (result.error) {

	    //если ОШибка при создании чека записываем ее в базу по GUID
	    //console.log(result);

	    sql = `update raifpayments set check_status='ERROR', checkcallback=($2) where guid=($1) AND (check_status = 'ERROR' OR check_status is null OR check_status = '') ;`

	  	await query(sql, [ params.id, result ])

	  	//const data = resultsql.rows[0];
	    //возвращаем райфу 500 считаем что чек не создался по тех причинам и надо его пересоздать но инициатором будет райф
      statusCheckPromise(data.raifpaymentscallback.check);

      if (result.msg && result.msg.trim() == 'Чек с данным идентификатором уже был создан в системе') {
        //return json({'res': data.raifpaymentscallback}, {status: 200});
        //возвращаем райфу 500 чтбы он делал это периодично пока не фискализируется чек
          //return json({'res': data.raifpaymentscallback}, {status: 500});
          return json({'res': result.msg}, {status: 500});
	    } else {
	        return json( {'res' : 'niht OK', result} , {status: 500});
	    }
	  }

		//через 5 сек обновим статус
	  statusCheckPromise(data.raifpaymentscallback.check);

		//
		return json({'res': data.raifpaymentscallback}, {status: 200});

	} else {
		//return json({'res':'niht ok Bro'}, {status: 500});
		return json({'res': data.raifpaymentscallback}, {status: 500});

	}
}
