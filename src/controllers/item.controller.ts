import { Request, Response } from 'express';
import { ItemRepository } from '../repositories/item.repository'; 
import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();
const itemRepository = new ItemRepository(prisma);

export class ItemController {
  async createItem(req: Request, res: Response): Promise<void> {
    try {
      const itemData: Omit<Item, 'id'> = req.body; 
      const newItem = await itemRepository.create(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar item' });
    }
  }

  async getItemById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const item = await itemRepository.findById(id);
      if (!item) {
        res.status(404).json({ message: 'Item não encontrado' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar item' });
    }
  }

  async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await itemRepository.findAll();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar itens' });
    }
  }

  async updateItem(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const itemData: Partial<Omit<Item, 'id'>> = req.body;
    try {
      const existingItem = await itemRepository.findById(id);
      if (!existingItem) {
        res.status(404).json({ message: 'Item não encontrado' });
        return;
      }
      const updatedItem = await itemRepository.update(id, itemData);
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  }

  async deleteItem(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const existingItem = await itemRepository.findById(id);
        if (!existingItem) {
            res.status(404).json({ message: 'Item não encontrado' });
            return;
        }
      await itemRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar item' });
    }
  }
}
