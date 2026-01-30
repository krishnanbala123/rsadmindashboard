import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import InvoicePDF from '@/lib/InvoicePDF';
import { pdf } from '@react-pdf/renderer';

export async function GET(req, context) {
  try {
    await connectDB();

    // ✅ FIX: await params
    const params = await context.params;
    const id = params.id;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const pdfBuffer = await pdf(
      <InvoicePDF order={order} />
    ).toBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=invoice-${order.orderId}.pdf`
      }
    });

  } catch (err) {
    console.error('INVOICE ERROR:', err);
    return NextResponse.json(
      { error: 'Invoice generation failed' },
      { status: 500 }
    );
  }
}
