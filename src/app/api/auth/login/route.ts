import connectDB from '@/lib/db';
import db from '@/lib/db';
import { verifyFirebaseToken } from '@/lib/firebase-admin';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: NextRequest) {
    await connectDB();

    const { token } = await req.json();
    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    try {
        const decoded = await verifyFirebaseToken(token);
        const user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            return NextResponse.json({ message: 'User not found. Please register.' });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}