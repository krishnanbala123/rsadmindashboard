
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const result = await Order.findByIdAndUpdate(
      id,
      { movedToHistory: true },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

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
