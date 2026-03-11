import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";
import UserRoutes from "./routes/User.routes.js";
import PostRoutes from "./routes/Post.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "URL",
  credentials: true
}));
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});


app.use("/api/auth", UserRoutes);
app.use("/api/posts", PostRoutes);

app.listen(PORT, () => {
  console.log('Server running ...')
});
