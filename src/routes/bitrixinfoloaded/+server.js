import { statBitrixDocSalesLoaded } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	let guids;

	try {

		guids = await request.json();

		guids = "('" + guids.join("', '") + "')";

		//console.log(guids);
		const res = statBitrixDocSalesLoaded(guids);

		if (!res) {
			guids = '';
		}

	} catch (message) {
		guids = ''
	}

	if (!guids) {
  		throw error(400, 'no data or invalid format')
	}

	try {

		return new Response( 'Done')
		//return json(guids)

		} catch (message) {

			throw error(400, message)

	}

}
