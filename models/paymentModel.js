import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true }, // stores user's phone number for MoMo
    email: { type: String }, // optional Paystack email (auto-generated in controller)
    amount: { type: Number, required: true },
    nominee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    reference: { type: String, unique: false, sparse: true }, // Paystack transaction reference
    channel: { type: String, default: "mobile_money" }, // 'mobile_money' or 'card'
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
