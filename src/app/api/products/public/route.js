import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      status: true,
      stock: { $gte: 5000 }
    }).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error('PUBLIC PRODUCTS ERROR:', error);
    return NextResponse.json([], { status: 500 });
  }
}
