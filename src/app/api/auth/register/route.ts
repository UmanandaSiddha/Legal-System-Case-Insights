import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { verifyFirebaseToken } from '@/lib/firebase-admin';
import User from '@/models/user.model';
import { UserRoleEnum } from '@/types/enum';

export async function POST(req: NextRequest) {
    await connectDB();
    const { token, name } = await req.json();

    if (!token || !name) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const decoded = await verifyFirebaseToken(token);

        const existingUser = await User.findOne({ uid: decoded.uid });
        if (existingUser) {
            return NextResponse.json({ user: existingUser, message: 'User already exists' });
        }

        const newUser = await User.create({
            uid: decoded.uid,
            email: decoded.email,
            name,
            password: decoded.password,
            role: process.env.DEFAULT_ADMIN ? UserRoleEnum.ADMIN : UserRoleEnum.USER,
            isVerified: false,
        });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
