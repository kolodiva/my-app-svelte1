import { json, error } from '@sveltejs/kit'
//import { getStat } from '$lib/server/getData.js'


export async function load() {

    //const data = await getStat();
    const data = {'fffff': 'dddddddd'};

    return data;
}



// export const GET = async (event) => {
//
// 	const bitrix_id = event.url.searchParams.get('id')
//
// 	try {
//
// 			const response = await getStat(bitrix_id);
//
// 			return json(response);
//
// 			//return json({"response":"13211312123"})
//
// 		} catch (message) {
//
// 			throw error(400, message)
//
// 	}
//
// }
