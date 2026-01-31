import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const stock = Number(formData.get('stock'));

    // 🔥 AUTO STATUS LOGIC
    const status = stock >= 2000 ? 'in-stock' : 'out-of-stock';

    const file = formData.get('image');
    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'rs-bricks' },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(buffer);
    });

    const product = await Product.create({
      name: formData.get('name'),
      shortDescription: formData.get('shortDescription'),
      longDescription: formData.get('longDescription'),
      type: formData.get('type'),
      price: Number(formData.get('price')),
      // offer: Number(formData.get('offer') || 0),
      stock,
      status, // ✅ AUTO
      image: {
        url: upload.secure_url,
        public_id: upload.public_id
      }
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Create failed' },
      { status: 500 }
    );
  }
}
