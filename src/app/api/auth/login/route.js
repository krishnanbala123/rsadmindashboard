import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/User';
import connectDB from '@/lib/connectDB';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { uid, name, email, phone, photoURL } = body;

    if (!uid) {
      return NextResponse.json(
        { error: 'UID required' },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    let user = await User.findOne({ uid });

    if (user) {
      // ✅ Existing user → Update lastLogin
      user.lastLogin = new Date();
      await user.save();
    } else {
      // 🆕 New user → Create record
      user = await User.create({
        uid,
        name,
        email,
        phone,
        photoURL,
        lastLogin: new Date(),
      });
    }

    return NextResponse.json({
      message: 'Login successful',
      user,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
