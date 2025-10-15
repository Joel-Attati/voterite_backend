import express from "express";
import {
  addNomineeToCategory,
  getNomineesByCategory,
} from "../controllers/nomineeController.js";


const router = express.Router();
// POST /api/events/:id/categories/:catId/nominees → add nominee to a category
router.post("/:id/categories/:catId/nominees", addNomineeToCategory);

// GET /api/events/:id/categories/:catId/nominees → list nominees for a category
router.get("/:id/categories/:catId/nominees", getNomineesByCategory);

export default router;
