import { json, error } from '@sveltejs/kit'

export const GET = async (event) => {

	const query = event.url.searchParams.get('id') || '1278'

	try {

			const response = await fetch(`http://62.109.14.230/stat?id=${query}`)

			const res = await response.json();

			return json(res)

		} catch (message) {

			throw error(400, message)

	}

}
