import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,   // stores image path or URL
    required: true 
  },
  description: { 
    type: String 
  },
  date: { 
    type: Date 
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);
