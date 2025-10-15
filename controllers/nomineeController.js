import { Nominee } from "../models/nomineeModel.js";
import { Category } from "../models/categoryModel.js";


export const addNomineeToCategory = async (req, res) => {
  try {
    // Extract data from request
    const { name, image } = req.body; // data coming from frontend form
    const { catId } = req.params; // category ID from URL

    // Validation
    if (!name || !image) {
      return res
        .status(400)
        .json({ message: "Name and image are required fields." });
    }

    // Check if category exists
    const category = await Category.findById(catId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Create new nominee
    const nominee = new Nominee({
      name,
      image,
      category: catId,
    });

    // Save nominee to database
    await nominee.save();

    // Link nominee to the category
    category.nominees.push(nominee._id);
    await category.save();

    // Send response
    res.status(201).json({
      message: "Nominee added successfully.",
      nominee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all nominees for a specific category
 * @route GET /api/events/:id/categories/:catId/nominees
 */
export const getNomineesByCategory = async (req, res) => {
  try {
    const { catId } = req.params;

    // Find nominees linked to this category
    const nominees = await Nominee.find({ category: catId });

    res.status(200).json(nominees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
