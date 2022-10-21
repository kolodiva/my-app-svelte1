import { require } from '$lib/server/createRequire.js'

const { Pool } = require('pg')

import { API_URL_APP } from '$env/static/private'

export const poolPG = new Pool({
  connectionString: API_URL_APP,
})
