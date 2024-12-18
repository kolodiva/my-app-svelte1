import { poolPG } from '$lib/server/getPGConn.js'
import { SECRET_KEY1, SECRET_KEY2 } from '$env/static/private'

//универсальный механизм запросов
export const query = (sql, params) => poolPG.query(sql, params);

export async function getStat(bitrix_id) {

  const res = await poolPG
  .query(`with r2 as(
with r1 as(
select stat_year::varchar(5) || '-' || stat_month::varchar(5) period1, 0 filial1, 'ALL' filial_name1, make_date(stat_year, stat_month, 1) date1,  * from stat_bitrix where bitrix_id='${bitrix_id}')

select period1, filial1, filial_name1, guid, bitrix_id, name, date1,
sum(sum_sell) sum_sell, sum(qty_sell) qty_sell, sum(qty_reserve) sum_qty_reserve, sum(qty_sklad) sum_qty_sklad,
sum(qty_order) sum_qty_order, sum(qty_order_placed) sum_qty_order_placed, sum(qty_preorder) sum_qty_preorder
from r1
group by period1, filial1, filial_name1, guid, bitrix_id, name, date1

union all

select stat_year::varchar(5) || '-' || stat_month::varchar(5), filial_id, filial, guid, bitrix_id, name, make_date(stat_year, stat_month, 1) date1,
sum_sell, qty_sell, qty_reserve, qty_sklad,
qty_order, qty_order_placed, qty_preorder
from stat_bitrix where bitrix_id='${bitrix_id}')

select * from r2
order by filial1, date1 desc`)
  .then(results => {

    let firstEl = '';

    let total = {};
    let total1 = {};

    let count;

    results.rows.forEach((item, i) => {

      if (firstEl !== item.filial_name1) {

        if (firstEl) {total[firstEl] = total1}

        total['guid'] = item.guid;
        total['bitrix_id'] = item.bitrix_id;
        total['name'] = item.name;

        firstEl = item.filial_name1;

        total1 = [];
      }

      count = Math.round( (item.qty_sell === 0 || item.sum_sell === 0 ? 0 : item.sum_sell/item.qty_sell) * 100 )/100;

      total1.push({
        period:item.period1,
        price_avr: count ? count : 0,
        sum_sell: Number(item.sum_sell),
        qty_sell: Number(item.qty_sell),
        sum_qty_reserve: Number(item.sum_qty_reserve),
        sum_qty_sklad: Number(item.sum_qty_sklad),
        sum_qty_order: Number(item.sum_qty_order),
        sum_qty_order_placed: Number(item.sum_qty_order_placed),
        sum_qty_preorder: Number(item.sum_qty_preorder),
      });

      if (results.rows.length - 1 === i) {
        total[firstEl] = total1
      }

    });

    //console.log(total);
    return total;
  })
  .catch(err => {throw err})

  return res
}

export async function getStatShort(artikul, chatId=0) {

  const res = await poolPG
  .query(`select filial, artikul, artikul_new, name, qty1, url, price,
case when checkpointprices.chat_id is null then 0 else price1 end price1,
case when checkpointprices.chat_id is null then 0 else price2 end price2
from nomenklators1
left join checkpointprices as checkpointprices on checkpointprices.chat_id=${chatId} and checkpointprices.status>0
where artikul like '${artikul}'
order by filial`)
  .then(results => {

    let total = '';

    let count;

    results.rows?.forEach((item, i) => {
        total = '(' + item.artikul + ') ' + item.name + '\n' + 'MSC - ' + Number(item.qty1)  + '\n' + 'цена.розн: ' + Number(item.price) + (Number(item.price1) > 0 ? '\n' + 'цена.кропт: ' + Number(item.price1) : "")  + (Number(item.price2) > 0 ? '\n' + 'цена.кропт-6%: ' + Number(item.price2) : "") + (item.url ? '\n\n' + item.url : '');
    });

    //console.log(total);
    return total ? total : 'Нет данных по артикулу.'
  })
  .catch(err => {throw err})

  return res
}

export async function getStatDocSales(safe_id) {

  if (SECRET_KEY2 !== safe_id) {
    return []
  }

  const res = await poolPG
  .query(`select guid, doc_type, org_inn, doc_num, doc_data, doc_sum, inn, kpp, trim(bitrix_id) bitrix_id, goods
from docs
order by doc_data, doc_num limit 10`)
  .then(results => {

    let total = '';

    return results.rows;
  })
  .catch(err => {throw err})

  return res
}

export async function statBitrixDocSalesLoaded(guids) {

  const res = await poolPG
  .query(`update docs set loaded = 'true' where guid in ${guids}`)
  .then(results => {

    return true;
  })
  .catch(err => {throw err})

  return false
}

export async function getCurs(safe_id) {

  if (SECRET_KEY1 !== safe_id) {
    return []
  }

  const res = await poolPG
  .query(`select to_char(ondate, 'YYYYMMDD') ondate, code, cb, name, curs, koef from curses`)
  .then(results => {
    return results.rows;
  })
  .catch(err => {throw err})

  return res
}

export async function getPrice(safe_id, ondate) {

  if (SECRET_KEY2 !== safe_id) {
    return []
  }

  const res = await poolPG
  .query(`select to_char(ondate, 'YYYYMMDD') ondate, nomenkl_guid, type_price_code, type_price_name, curency_code, price1, price0, to_char(updated_at, 'YYYYMMDDHH24MISS') updated_at from prices where updated_at > '${ondate}'`)
  .then(results => {
    return results.rows;
  })
  .catch(err => {throw err})

  return res
}

export async function getStuff(safe_id) {

  if (SECRET_KEY1 !== safe_id) {
    return []
  }

  const res = await poolPG
  .query(`select stuff_name, stuff_code::char(20) stuff_code, stuff_position, to_char(updated_at, 'YYYYMMDDHH24MISS') updated_at from stuff order by stuff_name`)
  .then(results => {
    return results.rows;
  })
  .catch(err => {throw err})

  return res
}
