import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminPass) {
      return NextResponse.json({ error: 'Admin setup incomplete. Check env vars.' }, { status: 500 });
    }

    if (password === adminPass) {
      // Set secure HTTP-only cookie
      cookies().set('admin_token', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
