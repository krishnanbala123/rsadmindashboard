import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ Next.js 15 params fix
    const { id } = await context.params;

    const { paidAmount } = await req.json();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const paid = Number(paidAmount);
    const total = Number(order.totalAmount);

    // 🚫 BLOCK OVERPAYMENT
    if (paid > total) {
      return NextResponse.json(
        {
          error: `Invalid amount.
${order.noOfBricks} bricks × ₹${order.brickRate} = ₹${total}`
        },
        { status: 400 }
      );
    }

    // ✅ VALID PAYMENT
    const remaining = total - paid;

    order.paidAmount = paid;
    order.remainingAmount = remaining;
    order.paymentStatus =
      remaining === 0 ? 'completed' : 'pending';

    await order.save({ validateBeforeSave: false });

    return NextResponse.json(order);

  } catch (err) {
    console.error('PAYMENT UPDATE ERROR:', err);
    return NextResponse.json(
      { error: 'Payment update failed' },
      { status: 500 }
    );
  }
}
