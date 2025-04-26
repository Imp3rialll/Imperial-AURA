import { GraphQLClient } from 'graphql-request';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Cookie names for auth
const CUSTOMER_TOKEN_NAME = 'shopifyCustomerAccessToken';
const TOKEN_EXPIRY_NAME = 'shopifyCustomerTokenExpiry';

// Main handler for Shopify API requests
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, variables } = body;
    
    // Get domain and token from environment variables
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    
    // Debug environment variables
    console.log('Environment check:', {
      domain: domain ? 'Set' : 'Missing',
      accessToken: accessToken ? 'Set' : 'Missing',
      fullDomain: domain || 'Not available',
    });
    
    if (!domain || !accessToken) {
      return NextResponse.json(
        { error: 'Missing Shopify API configuration' },
        { status: 500 }
      );
    }
    
    const url = `https://${domain}/api/2023-10/graphql.json`;
    console.log('Shopify GraphQL URL:', url);
    
    // Create a new client for each request
    const shopifyClient = new GraphQLClient(url, {
      headers: {
        'X-Shopify-Storefront-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });
    
    // Execute the GraphQL request
    const data = await shopifyClient.request(query, variables);
    
    // Set CORS headers in the response
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error: any) {
    console.error('Shopify API error:', error);
    console.error('Request details:', error.request || 'No request details');
    console.error('Response details:', error.response || 'No response details');
    
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred while communicating with Shopify',
        details: error.response?.errors || error.response?.data,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

// Set auth cookies
export async function PUT(request: NextRequest) {
  try {
    const { accessToken, expiresAt } = await request.json();
    
    if (!accessToken || !expiresAt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const expires = new Date(expiresAt);
    
    // Set the cookies in the response
    const response = NextResponse.json({ success: true });
    
    // Set the access token cookie
    response.cookies.set({
      name: CUSTOMER_TOKEN_NAME,
      value: accessToken,
      expires,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better cross-site compatibility
    });
    
    // Set the expiry cookie
    response.cookies.set({
      name: TOKEN_EXPIRY_NAME,
      value: expiresAt,
      expires,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax'
    });
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Error setting auth cookies:', error);
    return NextResponse.json(
      { error: 'Failed to set authentication cookies' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

// Remove auth cookies
export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: CUSTOMER_TOKEN_NAME,
      value: '',
      expires: new Date(0),
      path: '/',
    });
    
    response.cookies.set({
      name: TOKEN_EXPIRY_NAME,
      value: '',
      expires: new Date(0),
      path: '/',
    });
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Error removing auth cookies:', error);
    return NextResponse.json(
      { error: 'Failed to remove authentication cookies' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 