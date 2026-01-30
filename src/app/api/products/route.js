import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

// 🔄 GET ALL PRODUCTS
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}

// ❌ DELETE PRODUCT (ALWAYS DELETE)
export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    // 🔍 get product
    const product = await Product.findById(id);

    // 🔥 delete cloudinary image if exists
    if (product?.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    // ❌ delete product from DB
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('DELETE ERROR:', err);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}
