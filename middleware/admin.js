
export const checkAdmin = async (req, res, next) => {
  if(! req.user.isAdmin){
    return res.status(401).json({ message: "Not authorized"})
  }

  next()
};


export const checkUser = async(req,res ,next)=>{
  if(! req.user.isUser){
    return res.status(401).json({ message: "Not authorized"})
  }
  
  next()
}

