export async function handle({ event, resolve }) {



// if (event.url.pathname.startsWith('/custom')) {
//     const resp = new Response('custom response');
//     resp.headers.set('Access-Control-Allow-Origin', 'https://new.kolodiva.com');
//     return resp;
//   }
//console.log('1111', event.HeadersList)

  const response = await resolve(event);


  //
  // response.headers.set('Access-Control-Allow-Origin', '*');
  // response.headers.set('Access-Control-Max-Age', 0);

  // // Apply CORS header for API routes
  // if (event.url.pathname.startsWith('/changeorder')) {
  //     // Required for CORS to work
  //var origin = ["Origin"];
  let origin

if (process.env.NODE_ENV === 'development') {

    origin = 'http://localhost:9100'

  } else {

    origin = 'https://new.kolodiva.com'
  }


      if(event.request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Methods': 'OPTIONS, DELETE, POST, GET, PATCH, PUT',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials' : 'true',
            'Access-Control-Allow-Headers': 'Content-Type, Hostes',
          }
        });
      }
  //
  //     response.headers.append('Access-Control-Allow-Origin', `*`);
  // }

  // response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  // response.headers.set('Allow', 'POST, GET, HEAD');

  response.headers.append('Access-Control-Allow-Origin', origin);
  //response.headers.append('Access-Control-Allow-Origin', 'http://localhost:9100');
  console.log(response.headers)

  return response;
}
