import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const params1 = await request.json()

	return json({params1});

}
