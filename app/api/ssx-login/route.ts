import ssx from "../_ssx";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();

  const cookieStore = cookies();
  const nonce = cookieStore.get('nonce');

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
        'Access-Control-Allow-Methods': 'POST', // Add other allowed methods if needed
      },
    });
  }

  // Handle the POST request and include the CORS headers
  return new NextResponse.json(
    await ssx.login(
      body.siwe,
      body.signature,
      body.daoLogin,
      body.resolveEns,
      nonce?.value ?? "",
      body.resolveLens,
    ),
    {
      headers,
      status: 200
    }
  );
}
