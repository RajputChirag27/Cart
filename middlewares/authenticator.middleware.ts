import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { AuthenticatedRequest } from '../interfaces/authentication.interface';



// Middleware to authenticate the user
function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token: string | undefined = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided.");
    return
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Forbidden: Invalid token.");
    }
    req.user  = decoded;
    next();
  });
}

export default authenticateToken;
