import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const users = await User.find()
      .sort({ lastLogin: -1 })
      .select('name email phone role lastLogin createdAt updatedAt');

    return NextResponse.json(users);

  } catch (err) {
    console.error('USER LOGIN API ERROR:', err);
    return NextResponse.json([], { status: 500 });
  }
}
