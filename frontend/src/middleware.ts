import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Allow Clarity Bot to access CSS and other assets
  const userAgent = request.headers.get('user-agent') || '';
  
  if (userAgent.includes('Clarity-Bot')) {
    // Add CORS headers for Microsoft Clarity
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, User-Agent');
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, User-Agent',
      },
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    // Match all CSS, font, and asset files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};