import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from './lib/firebase-admin';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    try {
        await verifyFirebaseToken(token);
        return NextResponse.next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return NextResponse.redirect(new URL('/auth', req.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/api/protected/:path*'],
};
