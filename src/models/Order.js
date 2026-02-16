import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    deliveryAddress: {
      type: String,
      required: true
    },

    location: {
      lat: Number,
      lng: Number,
      // text: String
    },

    type: {
      type: String,
      required: true
    },

    noOfBricks: {
      type: Number,
      required: true
    },

    brickRate: {
      type: Number,
      required: true
    },

    delAmount: {
      type: Number,
      default: 0
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paidAmount: {
      type: Number,
      default: 0
    },

    remainingAmount: {
      type: Number,
      default: 0
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },

    verified: {
      type: Boolean,
      default: false
    },

    verifiedAt: Date,

     // 🔥 IMPORTANT (Orders page vs Order History)
    movedToHistory: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model('Order', OrderSchema);
