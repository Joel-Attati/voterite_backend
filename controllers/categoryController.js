import { Category } from "../models/categoryModel.js";
import { Event } from "../models/eventModel.js";

//  Add a category to an event
export const addCategoryToEvent = async (req, res) => {
  try {
    const { name } = req.body;
    const { id: eventId } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Find the event first
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create category linked to the event
    const category = new Category({ name, event: eventId });
    await category.save();

    // Add category ID to the event's list
    event.categories.push(category._id);
    await event.save();

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all categories for an event
export const getCategoriesByEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const categories = await Category.find({ event: eventId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
