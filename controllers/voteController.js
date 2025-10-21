import { Nominee } from "../models/nomineeModel.js";
import { Payment } from "../models/paymentModel.js";
import { initializePayment, verifyPayment } from "../utils/paystack.js";

// 1️⃣ Initiate Paystack Mobile Money Payment
export const initiatePayment = async (req, res) => {
  try {
    const { nomineeId, amount, phoneNumber } = req.body;

    if (!nomineeId || !amount || !phoneNumber)
      return res.status(400).json({ message: "All fields are required." });

    // Validate nominee
    const nominee = await Nominee.findById(nomineeId);
    if (!nominee)
      return res.status(404).json({ message: "Nominee not found." });

    // Use a placeholder email (Paystack requires an email)
    const email = `${phoneNumber}@voterite.com`;

    // Create pending payment
    const payment = await Payment.create({
      phoneNumber,
      amount,
      nominee: nomineeId,
      status: "pending",
    });

    // Initialize payment via Paystack
    const response = await initializePayment({
      email,
      amount,
      phone: phoneNumber,
    });

    // Save Paystack reference
    payment.reference = response.data.reference;
    await payment.save();

    res.status(200).json({
      message: "Payment initialized successfully.",
      authorization_url: response.data.authorization_url,
      reference: response.data.reference,
    });
  } catch (error) {
    console.error("Error initiating payment:", error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Paystack Callback Handler
export const handlePaystackCallback = async (req, res) => {
  try {
    const { reference } = req.query;
    if (!reference)
      return res.status(400).json({ message: "Missing reference." });

    // Verify payment with Paystack
    const verifyResponse = await verifyPayment(reference);
    const data = verifyResponse.data;

    // Find payment record
    const payment = await Payment.findOne({ reference }).populate("nominee");
    if (!payment)
      return res.status(404).json({ message: "Payment not found." });

    // Handle success
    if (data.status === "success") {
      payment.status = "completed";
      await payment.save();

      const nominee = await Nominee.findById(payment.nominee._id);
      nominee.votes += 1;
      await nominee.save();

      return res.status(200).json({
        message: "Payment successful — vote counted!",
        nominee: nominee.name,
      });
    } else {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Payment failed or incomplete." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};
// 3️⃣ Get Voting Statistics
export const getVoteStats = async (req, res) => {
  try {
    // Optional: if you pass categoryId or eventId, filter by that
    const { categoryId, eventId } = req.query;

    // Base query
    let filter = {};
    if (categoryId) filter.category = categoryId;
    if (eventId) filter.event = eventId;

    // Fetch all nominees (filtered if needed)
    const nominees = await Nominee.find(filter)
      .populate("category", "name") // optional: show category name
      .populate("event", "name");   // optional: show event name

    // Build stats response
    const stats = nominees.map((nominee) => ({
      nomineeId: nominee._id,
      nomineeName: nominee.name,
      votes: nominee.votes,
      category: nominee.category?.name || null,
      event: nominee.event?.name || null,
    }));

    res.status(200).json({
      message: "Voting statistics retrieved successfully.",
      totalNominees: stats.length,
      stats,
    });
  } catch (error) {
    console.error("Error fetching vote stats:", error.message);
    res.status(500).json({ message: "Failed to load statistics." });
  }
};

