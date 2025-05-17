import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

// Função para gerar o token JWT
const generateToken = (userId: number) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET não definido no arquivo .env');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
};

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, tipo } = req.body;

    try {
      // Verifica se o email já está em uso
      const existingUser = await prisma.usuario.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email já está em uso' });
        return;
      }

      // Hash da senha usando Argon2
      const hashedPassword = await hash(senha);

      // Cria o usuário
      const newUser = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          tipo, // 'CLIENTE' ou 'FORNECEDOR'
        },
      });

      const tipoUpper = tipo.toUpperCase();

      // Cria um perfil de cliente ou fornecedor com base no tipo
      if (tipoUpper === 'CLIENTE') {
        await prisma.cliente.create({
          data: {
            id: newUser.id, // Usa o ID do usuário como ID do cliente
          },
        });
      } else if (tipoUpper === 'FORNECEDOR') {
        await prisma.fornecedor.create({
          data: {
            id: newUser.id, 
            avaliacaoTotal: 0, 
          },
        });
      }


      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await prisma.usuario.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Verifica a senha usando Argon2
      const passwordMatch = await verify(user.senha, senha);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      // Gera o token JWT
      const token = generateToken(user.id);

      res.status(200).json({ token, user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

    async verifyJWT(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            res.status(401).json({ message: 'Token não fornecido' });
            return;
        }

        try {
            const secretKey = process.env.JWT_SECRET;
             if (!secretKey) {
                throw new Error('JWT_SECRET não definido no arquivo .env');
             }
            const decoded = jwt.verify(token, secretKey) as { userId: number };
            const user = await prisma.usuario.findUnique({
                where: { id: decoded.userId },
                select: { id: true, nome: true, email: true, tipo: true }, // Seleciona apenas os campos necessários
            });

            if (!user) {
                res.status(401).json({ message: 'Token inválido' });
                return;
            }

            res.status(200).json({ user }); // Retorna os dados do usuário
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    }
}

