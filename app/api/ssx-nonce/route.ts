import ssx from "../_ssx";

export async function GET(request: Request) {
  const nonce = ssx.generateNonce();
  
  // Set the appropriate CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // Replace with the actual origin
    'Access-Control-Allow-Credentials': 'true',
    // Add other headers if needed
  };

  // Check if the request is a preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...headers,
        'Access-Control-Allow-Methods': 'GET', // Add other allowed methods if needed
      },
    });
  }

  // Handle the GET request and include the CORS headers
  return new Response(nonce, {
    status: 200,
    headers: {
      ...headers,
      'Set-Cookie': `nonce=${nonce}`,
    }
  });
}
