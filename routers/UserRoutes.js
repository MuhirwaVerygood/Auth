import express from "express"
import { accessByAdminOnly, loginUser, registerUser } from "../controllers/userControllers.js";
import { authenticate } from "../middleware/auth.js";
const userRoutes = express.Router()

userRoutes.post("/register",  registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/profile", authenticate,  accessByAdminOnly)

export default userRoutes;