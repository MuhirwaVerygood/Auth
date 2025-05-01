import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const comparePassword = async (requestPassword, savedPassword) => {
    const passwordsMatch = await bcrypt.compare(requestPassword, savedPassword)
    return passwordsMatch;
}


const generateToken = async (user) => {
    return jwt.sign(
      {
        id: user._id,
        isAdmin: !!user.isAdmin,
        isUser: !!user.isUser,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  };

  
  
  const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  };

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, isAdmin, isUser } = req.body;

        if(isAdmin && isUser){
            return res.status(400).json({message:"User can not be both admin and user "})
        }

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(409).json({ message: "User with that email already exists" })
        }
    
        const hashedPassword = await hashPassword(password)
        const user = await userModel.create(
            {
                username,
                email, 
                password: hashedPassword,
                isAdmin,
                isUser
            }
        )
    
        const userWithoutPassword = await userModel.findById(user._id).select("-password")
        return res.status(201).json({message: "User created successfully",  user: userWithoutPassword })     
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}


export const loginUser = async(req ,res  )=>{
    try {
        const {email, password} = req.body;
        const userExists = await userModel.findOne({email})
        if(!userExists){
            return res.status(401).json({message:"Invalid email or password"})
        }

        const passwordMatches = await comparePassword(password, userExists.password)
        if(!passwordMatches){
            return res.status(401).json({message:"Invalid email or password"})
        }

        
        const token = await generateToken(userExists);
        return res.status(200).json({message: "Logged in successfully" ,  token})
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
        
    }
}


export const accessByAdminOnly = async(req,res)=>{

    return res.json(req.user)
}

export const accessedByUsersOnly = async(req,res)=>{
    return res.status(200).json({message : "Welcome user"})
}