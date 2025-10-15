import express from "express";
import { addCategoryToEvent, getCategoriesByEvent } from "../controllers/categoryController.js";

const router = express.Router();

// POST /api/events/:id/categories → add category
router.post("/:id/categories", addCategoryToEvent);

// GET /api/events/:id/categories → list categories for an event
router.get("/:id/categories", getCategoriesByEvent);

export default router;
