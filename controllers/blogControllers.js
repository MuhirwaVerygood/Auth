import { blogModel } from "../models/BlogModel.js";

export const createBlog = async(req, res ) =>{
    try {
        const {title, content, body} = req.body;

        if (!title || !content || !body) {
            return res.status(400).json({ message: "Title, content, and body are required" });
        }

        
            const newBlog = await blogModel.create({
                title, 
                content,
                body,
                user: req.user._id
            })

            const populatedBlog = await blogModel.findById(newBlog._id)
            .populate({
                path: 'user',
                select: '-password' 
            });

        res.status(201).json({ 
            message: "Blog created successfully",
            blog: populatedBlog
        });
                    
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)        
    }
}

