import { NextRequest, NextResponse } from 'next/server';

// Zoho API configuration
const ZOHO_REGION = 'com'; // Change to 'eu' or 'in' based on your region
const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
const ZOHO_LIST_KEY = process.env.ZOHO_LIST_KEY; // Your Helthy Waitlist list key

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
}

// Get fresh access token using refresh token
async function getZohoAccessToken(): Promise<string> {
  const tokenUrl = `https://accounts.zoho.${ZOHO_REGION}/oauth/v2/token`;
  
  const params = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN!,
    client_id: ZOHO_CLIENT_ID!,
    client_secret: ZOHO_CLIENT_SECRET!,
    grant_type: 'refresh_token'
  });

  try {
    console.log('Attempting to refresh Zoho token...');
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    const responseText = await response.text();
    console.log('Token refresh response:', responseText);

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText} - ${responseText}`);
    }

    const data: ZohoTokenResponse = JSON.parse(responseText);
    console.log('Access token obtained successfully');
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Zoho token:', error);
    throw error;
  }
}

// Add contact to Zoho Campaigns list
async function addToZohoCampaignsList(email: string, firstName?: string): Promise<boolean> {
  try {
    const accessToken = await getZohoAccessToken();
    const campaignsUrl = `https://campaigns.zoho.${ZOHO_REGION}/api/v1.1/addlistsubscribersinbulk`;

    // Use the correct parameters as per Zoho documentation
    const params = new URLSearchParams({
      listkey: ZOHO_LIST_KEY!,
      resfmt: 'JSON',
      emailids: email
    });

    console.log('Adding contact to Zoho list:', email);
    console.log('Request URL:', `${campaignsUrl}?${params.toString()}`);
    
    const response = await fetch(`${campaignsUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const responseText = await response.text();
    console.log('Zoho Campaigns response:', response.status, responseText);

    // Parse JSON response
    try {
      const jsonResponse = JSON.parse(responseText);
      if (jsonResponse.status === 'success' && jsonResponse.code === '0') {
        console.log('Contact added successfully to list:', jsonResponse.listname);
        return true;
      } else {
        console.error('Zoho API Error:', jsonResponse);
        return false;
      }
    } catch (parseError) {
      console.error('Failed to parse Zoho response as JSON:', responseText);
      return false;
    }
  } catch (error) {
    console.error('Error adding contact to Zoho:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    console.log('Environment check:', {
      hasClientId: !!ZOHO_CLIENT_ID,
      hasClientSecret: !!ZOHO_CLIENT_SECRET,
      hasRefreshToken: !!ZOHO_REFRESH_TOKEN,
      hasListKey: !!ZOHO_LIST_KEY
    });

    if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN || !ZOHO_LIST_KEY) {
      console.error('Missing Zoho environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Add to Zoho Campaigns list
    const success = await addToZohoCampaignsList(email, firstName);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully added to waitlist!'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to add to waitlist. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
