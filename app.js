import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routers/UserRoutes.js"
import { blogRouter } from "./routers/BlogRoutes.js"
dotenv.config()
const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Connected to database")
).catch(error=> console.log(error)
)

const port = process .env.PORT ||  4000;

app.use("/api/v1/users" , userRoutes )
app.use("/api/v1/blogs" , blogRouter )

app.listen(port, ()=>{
    console.log("Server running on port" , port);
})