import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const recentLogins = await User.find()
      .sort({ lastLogin: -1 })
      .limit(5)
      .select('name email role lastLogin');

    return NextResponse.json({
      totalUsers,
      recentLogins
    });

  } catch (err) {
    console.error('ADMIN DASHBOARD ERROR:', err);

    return NextResponse.json(
      {
        totalUsers: 0,
        recentLogins: []
      },
      { status: 500 }
    );
  }
}
