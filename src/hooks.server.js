export async function handle({ event, resolve }) {

if (event.url.pathname.startsWith('/custom')) {
    const resp = new Response('custom response');
    resp.headers.set('Access-Control-Allow-Origin', 'https://new.kolodiva.com');
    return resp;
  }

  const response = await resolve(event);
  //
  response.headers.set('Access-Control-Allow-Origin', 'https://new.kolodiva.com');

  return response;
}
