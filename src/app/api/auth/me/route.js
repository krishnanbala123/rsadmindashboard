import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();

  const email = req.headers.get('x-user-email'); // frontend send pannum

  if (!email) return NextResponse.json(null);

  const user = await User.findOne({ email }).select('email role');
  return NextResponse.json(user);
}
