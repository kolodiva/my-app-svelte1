import { query } from '$lib/server/getData.js'

import { json, error } from '@sveltejs/kit';

export const POST = async ({request}) => {

	const msg = await request.json()

	return json({msg});

}
