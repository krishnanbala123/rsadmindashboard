import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const formData = await req.formData();
    const stock = Number(formData.get('stock'));

    // 🔥 AUTO STATUS
    const status = stock >= 2000 ? 'in-stock' : 'out-of-stock';

    const updateData = {
      name: formData.get('name'),
      description: formData.get('description'),
      type: formData.get('type'),
      price: Number(formData.get('price')),
      offer: Number(formData.get('offer') || 0),
      stock,
      status
    };

    const file = formData.get('image');
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'rs-bricks' },
          (err, result) => (err ? reject(err) : resolve(result))
        ).end(buffer);
      });

      updateData.image = {
        url: upload.secure_url,
        public_id: upload.public_id
      };
    }

    await Product.findByIdAndUpdate(id, updateData);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    );
  }
}
