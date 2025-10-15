import express from "express";
import {
  initiatePayment,
  handlePaystackCallback,
  // getVoteStats,
} from "../controllers/voteController.js";

const router = express.Router();

router.post("/initiate", initiatePayment);   // start momo payment
router.post("/callback", handlePaystackCallback); // handle momo callback
// router.get("/stats", getVoteStats);          // get voting stats

export default router;
