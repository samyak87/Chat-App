import express from "express";
const app = express();
import dotenv from "dotenv";
import connectToMongodb from "./db/connectToMongodb.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
// import conversationRoutes from "./routes/conversation.routes.js";
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  // root route
  res.send(`Server is running on port ${port}`);
});


app.use(express.json());

// auth route
app.use("/api/auth", authRoutes);

// message route
app.use("/api/messages", messageRoutes);

// conversation route
// app.use("/api/conversations", conversationRoutes);

app.listen(port, () => {
  connectToMongodb();
  console.log(`Server is running on port ${port}`);
});
