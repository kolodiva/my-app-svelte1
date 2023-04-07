export async function handle({ event, resolve }) {

// if (event.url.pathname.startsWith('/custom')) {
//     const resp = new Response('custom response');
//     resp.headers.set('Access-Control-Allow-Origin', 'https://new.kolodiva.com');
//     return resp;
//   }

  const response = await resolve(event);
  //
  // response.headers.set('Access-Control-Allow-Origin', '*');
  // response.headers.set('Access-Control-Max-Age', 0);

  // // Apply CORS header for API routes
  // if (event.url.pathname.startsWith('/changeorder')) {
  //     // Required for CORS to work
      if(event.request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Allow-Origin': 'https://new.kolodiva.com',
            'Access-Control-Allow-Headers': 'Authorization',
          }
        });
      }
  //
  //     response.headers.append('Access-Control-Allow-Origin', `*`);
  // }

  // response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  // response.headers.set('Allow', 'POST, GET, HEAD');

  response.headers.append('Access-Control-Allow-Origin', 'https://new.kolodiva.com');

  return response;
}
