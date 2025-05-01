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


export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, content, body } = req.body;
        const userId = req.user._id; 

        const blog = await blogModel.findById(id);
        
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.user.toString() !== userId.toString()) {
            return res.status(403).json({ 
                message: "Unauthorized - You can only update your own blogs" 
            });
        }

        // 3. Update the blog
        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { 
                title: title || blog.title, // Use existing if not provided
                content: content || blog.content,
                body: body || blog.body,
                updatedAt: new Date() // Explicit update timestamp
            },
            { new: true } // Return the updated document
        ).populate({
            path: 'user',
            select: '-password'
        });

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};