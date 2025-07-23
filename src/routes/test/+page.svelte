<script>

import { onMount } from 'svelte';
import jQuery from 'jquery';


export let data

//console.log(JSON.stringify(data))

onMount(() => {
window.$ = jQuery;  //could use anything here: window.jQuery = jQuery;

const paymentPage = new PaymentPageSdk('000003148440001-48440001', {
        url: 'https://pay-test.raif.ru/pay'
    });

    //console.log(paymentPage);

    window.paymentPage = paymentPage;

const checkout = new YooCheckout({ shopId: '1015017', secretKey: 'test_OOhKySiSrzvK4arigY9kNTPNaeqE7Zuq6R--T5K63O8' });

console.log(checkout);


});


async function submitform() {
//"paymentMethod": "ONLY_SBP",
var datto = {

"orderId": "444455556666111",
"amount": 135,
"comment": "Покупка Мебельной Фурнитуры",
"paymentDetails": "Платеж по Заказу 445646456111",

"extra": {
  "email": 'test@test.ru',
    "login": 'testLogin',
    "phone": '79191234567'
}

    };

    window.paymentPage.replace(datto);

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


<!-- //   const formData = new URLSearchParams();
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
// .catch(error => console.error('Ошибка обработки:', error)); -->
