import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  await connectDB();

  const { id } = await context.params; // ✅ IMPORTANT FIX

  const order = await Order.findByIdAndUpdate(
    id,
    { verified: true },
    { new: true }
  );

  return NextResponse.json(order);
}
