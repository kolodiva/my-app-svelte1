<script>

import { onMount } from 'svelte';
import jQuery from 'jquery';

onMount(() => {
window.$ = jQuery;  //could use anything here: window.jQuery = jQuery;
});

async function submitform() {


//   const formData = new URLSearchParams();
//
// formData.append('publicId', '000003148440001-48440001');
// formData.append('orderId', '444455556666');
// formData.append('amount', 13);
// formData.append('comment', 'Покупка Мебельной Фурнитуры');
// formData.append('locale', 'ru');
// formData.append('expirationDate', '2024-04-15T14:17:00.000+03:00');
// formData.append('paymentDetails', 'Платеж по Заказу 445646456111');
//
// fetch('https://pay-test.raif.ru/pay', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//   body: formData
// })
// .then(response => response.text())
// .then(data => console.log('Успешно обработано:', data))
// .catch(error => console.error('Ошибка обработки:', error));

var datto = {

"publicId": "000003148440001-48440001",
"orderId": "444455556666111",
"amount": 13,
"comment": "Покупка Мебельной Фурнитуры",
"extra": {
"apiClient": "Payform Software",
"apiClientVersion": "1.0.0"
},
"locale": "ru",
"expirationDate": "2024-04-2014:17:00.000+03:00",
"paymentDetails": "Платеж по Заказу 445646456111"

    };



var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://pay-test.raif.ru/pay",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMDAwMDMxNDg0NDAwMDEtNDg0NDAwMDEiLCJqdGkiOiI5NzBiYTMyMC03MjRlLTRhMjQtYTZjZC00NTdjMzU1MDdiYzMifQ.3MozYontrgHb4do5SEHK2isg7987ymu5WYdJYWH1Z9U",
    "cache-control": "no-cache"
  },
  "data": datto
}

window.$.ajax(settings).done(function (response) {
  console.log(response);
});




// var xhr = new XMLHttpRequest();
//      xhr.open("POST", "https://pay-test.raif.ru/pay", true);
//     //xhr.open(form.method, form.action, true);
//
//     // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//      //xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//
//     xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMDAwMDMxNDg0NDAwMDEtNDg0NDAwMDEiLCJqdGkiOiI5NzBiYTMyMC03MjRlLTRhMjQtYTZjZC00NTdjMzU1MDdiYzMifQ.3MozYontrgHb4do5SEHK2isg7987ymu5WYdJYWH1Z9U');
//
// var j = {
//
// "publicId": "000003148440001-48440001",
// "orderId": "444455556666",
// "amount": 13,
// "comment": "Покупка Мебельной Фурнитуры",
// "extra": {
// "apiClient": "Payform Software",
// "apiClientVersion": "1.0.0"
// },
// "locale": "ru",
// "expirationDate": "2024-04-15T14:17:00.000+03:00",
// "paymentDetails": "Платеж по Заказу 445646456111"
//
//     };
//
//     // console.log(JSON.stringify(j));
//
//
//     xhr.send(JSON.stringify(j));



    }


</script>


  <h2>Здравствуйте. Предлагаем Вам оплатить Ваш Заказа МФ Комплект:</h2>

  <div>

  <!-- <form action="https://pay-test.raif.ru/pay" method="post" enctype="text/plain">

</form> -->

<button on:click={submitform}>Оплатить</button>




  </div>


<style>
.text-yellow-400 {
  color: #ffc107;
}
.text-yellow-200 {
  color: #ffab00;
}
.text-yellow-100 {
  color: #ff9800;
}
.text-yellow-50 {
  color: #ff8b00;
}
</style>



<!-- //window.jQuery = require('jquery');
import jQuery from "jquery";
window.jQuery = jQuery;

// import jQuery from 'jquery';
//window.$ = -->
