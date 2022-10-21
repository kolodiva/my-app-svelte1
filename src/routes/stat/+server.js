import { json, error } from '@sveltejs/kit'
import { getStat } from '$lib/server/getData.js'

export const GET = async (event) => {

	const bitrix_id = event.url.searchParams.get('id')

	try {

			const response = await getStat(bitrix_id);

			return json(response)

		} catch (message) {

			throw error(400, message)

	}

}
