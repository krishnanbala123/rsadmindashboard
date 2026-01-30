import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Counter from '@/models/Counter';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🔢 Generate Order ID (ORD-001)
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const orderId = `ORD-${String(counter.value).padStart(3, '0')}`;

    // 🧮 CALCULATIONS
    const totalAmount = body.noOfBricks * body.brickRate;
    const paidAmount = Number(body.paidAmount || 0);
    const remainingAmount = totalAmount - paidAmount;

    const paymentStatus =
      remainingAmount === 0 ? 'completed' : 'pending';

    // 📦 CREATE ORDER
    const order = await Order.create({
      orderId,
      name: body.name,
      phone: body.phone,
      deliveryAddress: body.deliveryAddress,

      location: body.location, // { lat, lng, text }

      type: body.type,
      noOfBricks: body.noOfBricks,
      brickRate: body.brickRate,

      totalAmount,
      paidAmount,
      remainingAmount,
      paymentStatus,

      verified: false
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error('Order create error:', err);
    return NextResponse.json(
      { error: 'Order creation failed' },
      { status: 500 }
    );
  }
}
