import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    customerId: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    phone: String
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model('Customer', CustomerSchema);
