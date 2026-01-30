import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const users = await User.find()
      .sort({ lastLogin: -1 }) // recent login first
      .select('name email phone role lastLogin createdAt');

    return NextResponse.json(users);
  } catch (err) {
    console.error('USERS FETCH ERROR:', err);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
