import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.PAYSTACK_BASE_URL;

// 1️⃣ Initialize Payment (Supports MoMo)
export async function initializePayment({ email, amount, phone }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo/pesewas
        channels: ["mobile_money", "card"], // allow mobile money and card
        metadata: { phone }, // store phone number for reference
        callback_url: `${process.env.BACKEND_URL}/api/vote/callback`, // dynamic backend URL
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Paystack Init Error:", error.response?.data || error.message);
    throw error;
  }
}

// 2️⃣ Verify Payment
export async function verifyPayment(reference) {
  try {
    const response = await axios.get(`${BASE_URL}/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });
    return response.data;
  } catch (error) {
    console.error("Paystack Verify Error:", error.response?.data || error.message);
    throw error;
  }
}
