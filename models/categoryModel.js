import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  nominees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
    },
  ],
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
