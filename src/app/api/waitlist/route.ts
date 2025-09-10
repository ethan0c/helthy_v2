import { NextRequest, NextResponse } from 'next/server';

// Minimal Zoho CRM Lead creation via REST API
// Expects environment variables:
// ZOHO_ACCESS_TOKEN (short lived) or ZOHO_REFRESH_TOKEN + ZOHO_CLIENT_ID + ZOHO_CLIENT_SECRET + ZOHO_REFRESH_REDIRECT
// For simplicity here we assume a direct ACCESS TOKEN is provided via env and rotated externally.
// Set ZOHO_DATACENTER if not US (e.g. 'eu', 'in', 'au', 'jp') default 'com'

async function createLead(email: string) {
  const dc = process.env.ZOHO_DATACENTER || 'com';
  const accessToken = process.env.ZOHO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Missing ZOHO_ACCESS_TOKEN env');
  }
  const url = `https://www.zohoapis.${dc}/crm/v2/Leads`;
  const body = {
    data: [
      {
        Last_Name: 'Waitlist',
        Company: 'Helthy Waitlist',
        Email: email,
        Lead_Source: 'Website Waitlist',
        Description: 'Helthy landing waitlist form signup',
      },
    ],
    trigger: [],
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    // Zoho sometimes rejects if keep-alive; default ok
  });
  const json = await res.json();
  if (!res.ok || json.data?.[0]?.code !== 'SUCCESS') {
    console.error('Zoho lead create failed', json);
    throw new Error('Zoho CRM error');
  }
  return json.data[0];
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    await createLead(email);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
