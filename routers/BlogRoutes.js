import express from "express"
import { authenticate } from "../middleware/auth.js";
import { createBlog } from "../controllers/blogControllers.js";
export const blogRouter = express.Router()

blogRouter.post("/new",  authenticate,  createBlog)
