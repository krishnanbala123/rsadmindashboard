// import { connectDB } from '@/lib/mongodb';
// import Order from '@/models/Order';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     await connectDB();

//     const orders = await Order.find()
//       .sort({ createdAt: -1 });

//     return NextResponse.json(orders);
//   } catch (err) {
//     console.error('ORDERS GET ERROR:', err);
//     return NextResponse.json([], { status: 500 });
//   }
// }


import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({
      $or: [
        { movedToHistory: false },
        { movedToHistory: { $exists: false } } // 🔥 OLD ORDERS FIX
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json(orders);

  } catch (err) {
    console.error('ORDERS FETCH ERROR:', err);
    return NextResponse.json([], { status: 500 });
  }
}

