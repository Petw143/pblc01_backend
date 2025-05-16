import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware'; // Ajuste o caminho se necessário
import { ProductRepository } from '../repositories/produto.repository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const productRepo = new ProductRepository(prisma);

export class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await productRepo.findAll(); // Alterado para produtos
      res.json(produtos); // Alterado para produtos
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const produto = await productRepo.findById(id); // Alterado para produto
      if (!produto) { // Alterado para produto
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }
      res.json(produto); // Alterado para produto
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  }

  async createProduct(req: AuthRequest, res: Response): Promise<void> {
    const { nome, valor, quantidade } = req.body;
    try {
      const produto = await productRepo.create({ // Alterado para produto
        nome,
        valor: Number(valor), // Garante que o valor seja um número
        quantidade: Number(quantidade), // Garante que a quantidade seja um número
        fornecedorId: req.userId, // Usa o ID do fornecedor do AuthRequest
      });
      res.status(201).json(produto); // Alterado para produto
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }

  async updateProduct(req: AuthRequest, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { nome, valor, quantidade } = req.body;
    try {
      const existingProduto = await productRepo.findById(id); // Alterado para existingProduto
      if (!existingProduto) { // Alterado para existingProduto
        res.status(404).json({ message: 'Produto não encontrado' });
        return;
      }

      // Verifica se o usuário autenticado é o fornecedor do produto
      if (existingProduto.fornecedorId !== req.userId) { // Alterado para existingProduto
        res.status(403).json({ message: 'Acesso negado. Você não é o fornecedor deste produto.' });
        return;
      }

      const updatedProduto = await productRepo.update(id, { // Alterado para updatedProduto
        nome,
        valor: Number(valor), // Garante que o valor seja um número
        quantidade: Number(quantidade), // Garante que a quantidade seja um número
      });
      res.json(updatedProduto); // Alterado para updatedProduto
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  async deleteProduct(req: AuthRequest, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
        const existingProduto = await productRepo.findById(id);  // Alterado para existingProduto
        if (!existingProduto) {  // Alterado para existingProduto
          res.status(404).json({ message: 'Produto não encontrado' });
          return;
        }

      // Verifica se o usuário autenticado é o fornecedor do produto
      if (existingProduto.fornecedorId !== req.userId) { // Alterado para existingProduto
        res.status(403).json({ message: 'Acesso negado. Você não é o fornecedor deste produto.' });
        return;
      }

      await productRepo.delete(id);
      res.status(204).send();
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
}
