import { connectDB } from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Counter from '@/models/Counter';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  // 🔥 Auto increment customerId
  const counter = await Counter.findOneAndUpdate(
    { name: 'customerId' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  const customer = await Customer.create({
    customerId: counter.value, // ✅ 1,2,3…
    name: body.name,
    phone: body.phone
  });

  return NextResponse.json(customer);
}
