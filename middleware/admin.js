const User = require('../models/UserModel');

const checkAdmin = async (req, res, next) => {
  try {
    // First verify the token exists in headers
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token and check if user is admin
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = user;
    next();
    
  } catch (error) {
    return res.status(401).json({ 
      message: 'Not authorized', 
      error: error.message 
    });
  }
};

module.exports = checkAdmin;