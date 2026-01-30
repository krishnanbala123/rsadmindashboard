// import { connectDB } from '@/lib/mongodb';
// import Order from '@/models/Order';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   await connectDB();

//   const orders = await Order.find()
//     .sort({ createdAt: -1 })
//     .limit(5);

//   return NextResponse.json(orders);
// }


import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const orders = await Order
    .find()
    .sort({ createdAt: -1 }) // 🔥 newest first
    .limit(5);               // 🔥 ONLY 5

  return NextResponse.json(orders);
}
