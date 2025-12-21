
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email, name } = body;

    if (!id || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing user id or email' },
        { status: 400 }
      );
    }

    const appId = 'WuHpsO2eVB830cszviItrem8sDMerlBW';
    const apiKey = process.env.ORUFY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Missing Orufy API key in environment' },
        { status: 500 }
      );
    }

    const orufyRes = await fetch(`https://api.orufy.com/apps/${appId}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        externalUserId: id,
        email,
        name,
      }),
    });

    if (!orufyRes.ok) {
      const errorText = await orufyRes.text();
      return NextResponse.json({ success: false, message: errorText }, { status: orufyRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
