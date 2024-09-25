import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser'; // Importe o cookie-parser
import dotenv from 'dotenv';
dotenv.config();

declare namespace Express {
  interface Request {
    user?: import('../entity/user').User;
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
 
  cookieParser()(req, res, () => {
    const token = req.cookies.token;
    

    if (!token) {
      return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_CHAVE as string, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      (req as any).user = user;
      next();
    });
  });
};

export default authenticateToken;
