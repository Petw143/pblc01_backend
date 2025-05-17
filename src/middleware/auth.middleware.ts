/*
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config();
const prisma = new PrismaClient();

// Estende a interface Request para incluir o campo userId
export interface AuthRequest extends Request {
  userId?: number; // userId é opcional, pois pode não existir em todas as requisições
}

// Middleware para verificar o token JWT
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secretKey = process.env.JWT_SECRET || 'secret'; // Usa a chave do .env ou 'secret' como fallback
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Token inválido: userId não encontrado' });
    }

    // Verifica se o usuário existe no banco de dados
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: 'Token inválido: usuário não encontrado' });
    }

    (req as AuthRequest).userId = decoded.userId; // Atribui o userId à requisição
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      console.error(error);
      return res.status(401).json({ message: 'Erro de autenticação' }); // Mensagem genérica para outros erros
    }
  }
};
*/


import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define interface AuthRequest extendendo Request com campo user tipado
export interface AuthRequest extends Request {
  user?: {
    userId: number; 
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Token ausente' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: number };
    req.user = decoded; // atribui o objeto decodificado ao req.user
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};
