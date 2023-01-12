import { getStatDocSales } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	const safe_id = event.url.searchParams.get('id')

	//
	try {

			const response = await getStatDocSales(safe_id);

			return json(response)

		} catch (message) {

			throw error(400, message)

	}

}
