import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const history = await Order.find({
    movedToHistory: true
  }).sort({ updatedAt: -1 });

  return NextResponse.json(history);
}
