import express from "express";
const app = express();
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongodb from "./db/connectToMongodb.js";

dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  // root route
  res.send(`Server is running on port ${port}`);
});


app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectToMongodb();
  console.log(`Server is running on port ${port}`);
});
