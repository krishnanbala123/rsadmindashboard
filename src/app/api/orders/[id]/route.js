import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function DELETE(req, context) {
  try {
    await connectDB();

    // ✅ Next.js 15 fix – params is Promise
    const { id } = await context.params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // 🔥 MOVE TO HISTORY (NOT REAL DELETE)
    order.movedToHistory = true;
    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order moved to history'
    });

  } catch (err) {
    console.error('ORDER DELETE ERROR:', err);

    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
