import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or image path
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export const Nominee = mongoose.model("Nominee", nomineeSchema);
