// import { connectDB } from '@/lib/mongodb';
// import Order from '@/models/Order';
// import { NextResponse } from 'next/server';

// export async function PUT(req, context) {
//   try {
//     await connectDB();

//     const { id } = context.params; // ✅ FIXED

//     const { deliveryAmount } = await req.json();

//     const order = await Order.findById(id);
//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     const delivery = Number(deliveryAmount);

//     if (isNaN(delivery) || delivery < 0) {
//       return NextResponse.json(
//         { error: 'Invalid delivery amount' },
//         { status: 400 }
//       );
//     }

//     // Safe items calculation
//     const itemsTotal = (order.items || []).reduce(
//       (sum, item) =>
//         sum + (Number(item.rate) * Number(item.quantity)),
//       0
//     );

//     const newTotal = itemsTotal + delivery;

//     // Prevent overpayment after delivery change
//     if (Number(order.paidAmount) > newTotal) {
//       return NextResponse.json(
//         {
//           error: `Paid amount ₹${order.paidAmount} exceeds new total ₹${newTotal}`
//         },
//         { status: 400 }
//       );
//     }

//     order.delAmount = delivery;
//     order.totalAmount = newTotal;
//     order.remainingAmount =
//       newTotal - Number(order.paidAmount);

//     order.paymentStatus =
//       order.remainingAmount === 0
//         ? 'completed'
//         : 'pending';

//     await order.save({ validateBeforeSave: false });

//     return NextResponse.json(order);

//   } catch (err) {
//     console.error('DELIVERY UPDATE ERROR:', err);
//     return NextResponse.json(
//       { error: 'Delivery update failed' },
//       { status: 500 }
//     );
//   }
// }
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  try {
    await connectDB();

    // ✅ Next.js 15 safe params
    const { id } = await context.params;

    const { deliveryAmount } = await req.json();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const delivery = Number(deliveryAmount);

    // 🚫 Invalid delivery check
    if (isNaN(delivery) || delivery < 0) {
      return NextResponse.json(
        { error: 'Invalid delivery amount' },
        { status: 400 }
      );
    }

    // 🔥 REMOVE OLD DELIVERY SAFELY
    const oldDelivery = Number(order.delAmount || 0);

    // Base total (without delivery)
    const baseTotal = Number(order.totalAmount || 0) - oldDelivery;

    // Add new delivery
    const newTotal = baseTotal + delivery;

    // 🚫 Prevent overpayment
    if (Number(order.paidAmount || 0) > newTotal) {
      return NextResponse.json(
        {
          error: `Paid amount ₹${order.paidAmount} exceeds new total ₹${newTotal}`
        },
        { status: 400 }
      );
    }

    // ✅ Update values
    order.delAmount = delivery;
    order.totalAmount = newTotal;
    order.remainingAmount =
      newTotal - Number(order.paidAmount || 0);

    order.paymentStatus =
      order.remainingAmount === 0
        ? 'completed'
        : 'pending';

    await order.save({ validateBeforeSave: false });

    return NextResponse.json(order);

  } catch (err) {
    console.error('DELIVERY UPDATE ERROR:', err);
    return NextResponse.json(
      { error: 'Delivery update failed' },
      { status: 500 }
    );
  }
}
