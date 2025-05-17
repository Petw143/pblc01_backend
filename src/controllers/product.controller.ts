import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ProductRepository } from '../repositories/produto.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const produtoRepo = new ProductRepository(prisma);

export class ProdutoController {
  async obterTodosProdutos(req: Request, res: Response, next: NextFunction): Promise<void> { // Adicionado next
    try {
      const produtos = await produtoRepo.findAll();
      res.json(produtos);
    } catch (error) {
      console.error(error);
      next(error); 
    }
  }

  async obterProdutoPorId(req: Request, res: Response, next: NextFunction): Promise<void> { // Adicionado next
    const id = Number(req.params.id);
    try {
      const produto = await produtoRepo.findById(id);
      if (!produto) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.json(produto);
    } catch (error) {
      console.error(error);
      next(error); 
    }
  }

  async criarProduto(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
      }

      const fornecedorExiste = await prisma.fornecedor.findUnique({
        where: { id: userId },
      });

      if (!fornecedorExiste) {
        res.status(400).json({ message: 'Usuário não é um fornecedor válido. Para adicionar um prdouto no banco de dados é necessário ser um fornecedor.' });
        return;
      }

      const { nome, valor, quantidade } = req.body;

      if (!nome || isNaN(Number(valor)) || isNaN(Number(quantidade))) {
        res.status(400).json({ message: 'Dados inválidos. Verifique nome, valor, quantidade e id do fornecedor.' });
        return;
      }

      const novoProduto = await produtoRepo.create({
        nome,
        valor: Number(valor),
        quantidade: Number(quantidade),
        fornecedorId: userId,
      });

      res.status(201).json(novoProduto);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }


  async atualizarProduto(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
      }

      const id = Number(req.params.id);
      const { nome, valor, quantidade } = req.body;

      const produtoExistente = await produtoRepo.findById(id);
      if (!produtoExistente) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }

      if (produtoExistente.fornecedorId !== userId) {
        res.status(403).json({ message: 'Acesso negado. Você não é o fornecedor deste produto.' });
        return;
      }

      const produtoAtualizado = await produtoRepo.update(id, {
        nome,
        valor: Number(valor),
        quantidade: Number(quantidade),
      });

      res.json(produtoAtualizado);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }


  async apagarProduto(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
      }

      const id = Number(req.params.id);
      const produtoExistente = await produtoRepo.findById(id);

      if (!produtoExistente) {
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }

      // Verifica se o usuário autenticado é o fornecedor do produto
      if (produtoExistente.fornecedorId !== userId) {
        res.status(403).json({ message: 'Acesso negado. Você não é o fornecedor deste produto.' });
        return;
      }

      await produtoRepo.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}
