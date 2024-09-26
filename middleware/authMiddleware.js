import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';

const protect = asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(token, process.env.KEY);

      req.user = await User.findById(decoded.id).select('-password');

   
      next();
    } catch (error) {
  
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  } else {
   
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
});

export default protect;
