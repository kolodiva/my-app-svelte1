import { getStatDocSales } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const GET = async (event) => {

	//
	try {

			const response = await getStatDocSales();

			return json(response)

		} catch (message) {

			throw error(400, message)

	}

}
