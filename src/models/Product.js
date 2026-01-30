import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String, required: true },

    type: {
      type: String,
      enum: [
        'hand-made bricks',
        'wire-cut bricks',
        'machine-cut bricks',
        'cement bricks'
      ],
      required: true
    },

    image: {
      url: String,
      public_id: String
    },

    price: { type: Number, required: true },

    // offer: { type: Number, default: 0 },

    stock: { type: Number, required: true },

    // 🔥 FIX: STRING STATUS (NOT BOOLEAN)
    status: {
      type: String,
      enum: ['in-stock', 'out-of-stock'],
      default: 'out-of-stock'
    }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
