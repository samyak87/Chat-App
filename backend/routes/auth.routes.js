import express from "express"
import { loginUser,logoutUser,signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login",loginUser)

router.post("/signup",signup)

router.post("/logout",logoutUser)

export default router;