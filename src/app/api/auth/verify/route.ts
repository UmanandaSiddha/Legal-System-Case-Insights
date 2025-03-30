import connectDB from '@/lib/db';
import { verifyFirebaseToken } from '@/lib/firebase-admin';
import User from '@/models/user.model';
import { UserRoleEnum } from '@/types/enum';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectDB();

    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

    try {
        const decoded = await verifyFirebaseToken(token);
        const existing = await User.findOne({ uid: decoded.uid });

        if (!existing) {
            const newUser = await User.create({
                uid: decoded.uid,
                email: decoded.email,
                name: decoded.name || 'Anonymous',
                role: process.env.DEFAULT_ADMIN ? UserRoleEnum.ADMIN : UserRoleEnum.USER,
                profilePicture: decoded.profilePicture || undefined,
                isVerified: decoded.email_verified ? true : false,
            });
            return NextResponse.json({ user: newUser }, { status: 201 });
        }

        return NextResponse.json({ user: existing }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}