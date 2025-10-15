import express from "express";
import { createEvent, getAllEvents, getEventById } from "../controllers/eventController.js";

const router = express.Router();

// POST /api/events → create new event
router.post("/", createEvent);

// GET /api/events → list all events
router.get("/", getAllEvents);

// GET /api/events/:id → get one event
router.get("/:id", getEventById);

export default router;
