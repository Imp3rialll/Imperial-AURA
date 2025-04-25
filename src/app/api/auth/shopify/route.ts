import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const CUSTOMER_TOKEN_NAME = 'shopifyCustomerAccessToken';
const TOKEN_EXPIRY_NAME = 'shopifyCustomerTokenExpiry';

// Handle token storage in cookies
export async function POST(request: NextRequest) {
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
      sameSite: 'strict',
    });
    
    // Set the expiry cookie
    response.cookies.set({
      name: TOKEN_EXPIRY_NAME,
      value: expiresAt,
      expires,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    
    return response;
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    return NextResponse.json(
      { error: 'Failed to set authentication cookie' },
      { status: 500 }
    );
  }
}

// Handle token removal
export async function DELETE() {
  try {
    // Remove the cookies in the response
    const response = NextResponse.json({ success: true });
    response.cookies.delete(CUSTOMER_TOKEN_NAME);
    response.cookies.delete(TOKEN_EXPIRY_NAME);
    
    return response;
  } catch (error) {
    console.error('Error removing auth cookie:', error);
    return NextResponse.json(
      { error: 'Failed to remove authentication cookie' },
      { status: 500 }
    );
  }
} 