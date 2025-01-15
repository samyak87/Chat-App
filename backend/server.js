import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToMongodb from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  // root route
  res.send(`Server is running on port ${port}`);
});



app.use(express.json());

app.use(cookieParser());

// auth route
app.use("/api/auth", authRoutes);

// message route
app.use("/api/messages", messageRoutes);

// user route
app.use("/api/users", userRoutes);


app.listen(port, () => {
  connectToMongodb();
  console.log(`Server is running on port ${port}`);
});
