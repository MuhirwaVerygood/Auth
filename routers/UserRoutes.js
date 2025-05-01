import express from "express"
import { accessByAdminOnly, accessedByUsersOnly, loginUser, registerUser } from "../controllers/userControllers.js";
import { authenticate } from "../middleware/auth.js";
import { checkUser } from "../middleware/admin.js";
const userRoutes = express.Router()

userRoutes.post("/register",  registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/profile", authenticate,  accessByAdminOnly)
userRoutes.get("/only", authenticate, checkUser , accessedByUsersOnly)

export default userRoutes;