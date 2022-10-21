import { json, error } from '@sveltejs/kit'
import { getCurs } from '$lib/server/getData.js'

export const GET = async (event) => {

	const safe_id = event.url.searchParams.get('id')

	try {

			const response = await getCurs(safe_id);

			return json(response)

		} catch (message) {

			throw error(400, message)

	}

}
