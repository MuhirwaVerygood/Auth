import express from "express"
import { authenticate } from "../middleware/auth.js";
import { createBlog, updateBlog } from "../controllers/blogControllers.js";
import { checkAdmin } from "../middleware/admin.js";
export const blogRouter = express.Router()

blogRouter.post("/new",  authenticate, checkAdmin,  createBlog)
blogRouter.put("/:id" ,  authenticate, checkAdmin, updateBlog)
