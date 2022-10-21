import { getStat } from '$lib/server/getData.js'

export async function load() {

    const res = await getStat();

    return res;

}
