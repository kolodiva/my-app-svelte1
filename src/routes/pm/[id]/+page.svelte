<script>

import { onMount } from 'svelte';
import jQuery from 'jquery';


export let data

//console.log(JSON.stringify(data))

onMount(() => {

  //console.log(JSON.stringify(data));

window.$ = jQuery;  //could use anything here: window.jQuery = jQuery;

//тестовый
// const paymentPage = new PaymentPageSdk('000003148440001-48440001', {
//         url: 'https://pay-test.raif.ru/pay'
//     });
//
//     window.paymentPage = paymentPage;
// });

//реальный
const paymentPage = new PaymentPageSdk('000001793199001-93199001', {
        url: 'https://pay.raif.ru/pay'
    });

    window.paymentPage = paymentPage;
});


async function submitform() {
//"paymentMethod": "ONLY_SBP",
var datto = {

"orderId": data.id,
"amount": data.headers.total,
"comment": `Платеж по Заказу ${data.headers.numOrder} от ${data.headers.dataOrder.replace(/(\d{4})(\d{2})(\d{2})/g, '$3-$2-$1')} `,
"paymentDetails": `Платеж по Заказу ${data.headers.numOrder}`,

"extra": {
  "email": 'test@test.ru',
    "login": 'testLogin',
    "phone": '79191234567'
}

    };

    window.paymentPage.replace(datto);

}


</script>

<div class="flex justify-center h-full min-h-screen w-full bg-gray-800 pt-12 p-4">

{#if Object.keys(data).length === 0}

<div class="card">
  <div data-aos-delay="150" class="rounded-xl bg-white p-4 text-center shadow-xl  border-4 border-red-600/60">
    <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
        <svg viewBox=" 0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white"></svg>
    </div>
    <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 ">Вас приветствует компания МФ Комплект!</h1>
    <p class="px-4 text-gray-500">По данной ссылке НЕ найдена Оплата.</p>
    <p class="px-4 text-gray-500">Возможно она НЕ действительна или уже Оплачена.</p>
    <p class="px-4 text-gray-500">Пока так.</p>
  </div>
</div>

  {:else}

  <div class="card">
    <div data-aos-delay="150" class="rounded-xl bg-white p-4 text-center shadow-xl  border-4 border-red-600/60">
      <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40">
          <svg viewBox=" 0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white"></svg>
      </div>
      <h1 class="text-darken mb-3 text-xl font-medium lg:px-14 ">Вас приветствует компания МФ Комплект!</h1>
      <p class="px-4 text-gray-500">Предлагаем Вам оплатить Ваш Заказ № {data.headers.numOrder} от {data.headers.dataOrder.replace(/(\d{4})(\d{2})(\d{2})/g, '$3-$2-$1')}</p>
      <h1 class="text-blue-600/100 my-3 text-xl font-medium lg:px-14 ">В сумме: {data.headers.total} руб.</h1>
      <p class="px-4 text-gray-500">Для этого Вам необходимо нажать на кнопку ниже</p>

      <button on:click={submitform} class="flex-1 mt-3 rounded-full border-2 border-blue-600/60 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
        <span class="text-gray-500">Перейти на страницу оплаты Райфайзен банка</span>
      </button>

    </div>
  </div>

  {/if}

</div>

<!-- <div class="container mx-auto my-10">


  <h1>Здравствуйте. Предлагаем Вам оплатить Ваш Заказ {data.headers.numOrder} МФ Комплект: </h1>

  <div> -->

  <!-- <form action="https://pay-test.raif.ru/pay" method="post" enctype="text/plain">

</form> -->

<!-- <button on:click={submitform}>Оплатить</button>




  </div>
</div> -->

<style>
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
