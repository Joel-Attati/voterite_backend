import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import nomineeRoutes from "./routes/nomineeRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();
app.use("/api/events", eventRoutes);
app.use("/api/events", categoryRoutes);
app.use("/api/events", nomineeRoutes);
app.use("/api/vote", voteRoutes);


app.get("/", (req, res) => {
  res.send("Backend running with MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
