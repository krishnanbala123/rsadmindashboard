import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // 🔐 Firebase / Auth UID
    uid: {
      type: String,
      required: true,
      unique: true
    },

    // 👤 Basic details
    name: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    phone: {
      type: String,
      trim: true
    },

    photoURL: {
      type: String
    },

    // 🛂 ROLE CONTROL
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'admin'
    },

    // 🕒 LAST LOGIN TRACK (IMPORTANT FOR DASHBOARD)
    lastLogin: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // ✅ createdAt & updatedAt auto
  }
);

// ✅ Prevent model overwrite error (Next.js safe)
export default mongoose.models.User ||
  mongoose.model('User', UserSchema);
