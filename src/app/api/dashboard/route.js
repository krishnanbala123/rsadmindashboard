// import { connectDB } from '@/lib/mongodb';
// import Order from '@/models/Order';
// import Product from '@/models/Product';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   await connectDB();

 
//   const totalProducts = await Product.countDocuments();

 
//   const totalOrders = await Order.countDocuments();

  
//   const pendingOrders = await Order.countDocuments({
//     $or: [
//       { verified: false },
//       { remainingAmount: { $gt: 0 } }
//     ]
//   });

//   const revenueAgg = await Order.aggregate([
//     {
//       $group: {
//         _id: null,
//         total: { $sum: '$paidAmount' }
//       }
//     }
//   ]);

//   const totalRevenue = revenueAgg[0]?.total || 0;

//   // 🕒 recent 5 orders
//   const recentOrders = await Order.find()
//     .sort({ createdAt: -1 })
//     .limit(5)
//     .select('orderId name phone paidAmount paymentStatus createdAt');

//   return NextResponse.json({
//     totalProducts,
//     totalOrders,
//     pendingOrders,
//     totalRevenue,
//     recentOrders
//   });
// }
// api/dashboard/route.js
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

const pendingOrders = await Order.countDocuments({
  paymentStatus: 'pending'
});

  const revenueAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$paidAmount' } } }
  ]);

  const totalRevenue = revenueAgg[0]?.total || 0;

  // 🔥 ALWAYS latest 5 orders
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('orderId name phone paidAmount paymentStatus createdAt');

  return NextResponse.json({
    totalProducts,
    totalOrders,
    pendingOrders,
    totalRevenue,
    recentOrders
  });
}
