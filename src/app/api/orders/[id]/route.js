// import { connectDB } from '@/lib/mongodb';
// import Order from '@/models/Order';
// import { NextResponse } from 'next/server';

// export async function DELETE(req, params) {
//   try {
//     await connectDB();

//     // ✅ Next.js 15 fix – params is Promise
//     const param = await params
//     const id = param.id
//     const order = await Order.findById("6978a060f42bec1146aec63d");

//     if (!order) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     // 🔥 MOVE TO HISTORY (NOT REAL DELETE)
//     order.movedToHistory = true;
//     await order.save();

//     return NextResponse.json({
//       success: true,
//       message: 'Order moved to history'
//     });

//   } catch (err) {
//     console.error('ORDER DELETE ERROR:', err);

//     return NextResponse.json(
//       { error: 'Delete failed' },
//       { status: 500 }
//     );
//   }
// }


// // import { connectDB } from '@/lib/mongodb';
// // import Order from '@/models/Order';
// // import { NextResponse } from 'next/server';

// // export async function DELETE(req, context) {
// //   try {
// //     await connectDB();

// //     // ✅ Next.js 15 FIX
// //     const { id } = await context.params;

// //     const url = new URL(req.url);
// //     const mode = url.searchParams.get('mode'); 
// //     // mode = "permanent" | "history"

// //     const order = await Order.findById(id);

// //     if (!order) {
// //       return NextResponse.json(
// //         { error: 'Order not found' },
// //         { status: 404 }
// //       );
// //     }

// //     // 🔴 PERMANENT DELETE (verify illama)
// //     if (mode === 'permanent') {
// //       await Order.findByIdAndDelete(id);
// //       return NextResponse.json({ success: true });
// //     }

// //     // 🟢 MOVE TO HISTORY (payment completed)
// //     if (mode === 'history') {
// //       order.movedToHistory = true;
// //       await order.save();

// //       return NextResponse.json({ success: true });
// //     }

// //     return NextResponse.json(
// //       { error: 'Invalid delete mode' },
// //       { status: 400 }
// //     );

// //   } catch (err) {
// //     console.error('ORDER DELETE ERROR:', err);
// //     return NextResponse.json(
// //       { error: 'Delete failed' },
// //       { status: 500 }
// //     );
// //   }
// // }


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
