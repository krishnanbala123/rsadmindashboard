import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const user = await User.findOneAndUpdate(
    { email: body.email },
    body,
    { upsert: true, new: true }
  );

  return NextResponse.json(user);
}
