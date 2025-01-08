import express from "express"
const app = express();
import dotenv from "dotenv"
import { log } from "console";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const port = process.env.PORT || 5000

app.get("/",(req,res) =>{
    // root route
  res.send(`Server is running on port ${port}`)
})


// auth routes
app.use("/api/auth",authRoutes);

app.listen(port,() => console.log(`Server is running on port ${port}`))