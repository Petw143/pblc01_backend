import { PrismaClient, Item } from '@prisma/client';

export class ItemRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  // Criar um novo item
  async create(data: Omit<Item, 'id'>): Promise<Item> {
    return await this.prisma.item.create({
      data,
    });
  }

  // Buscar item por ID
  async findById(id: number): Promise<Item | null> {
    return await this.prisma.item.findUnique({
      where: { id },
    });
  }

  // Buscar todos os itens
  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany();
  }

  // Atualizar um item
  async update(id: number, data: Partial<Omit<Item, 'id'>>): Promise<Item> {
    return await this.prisma.item.update({
      where: { id },
      data,
    });
  }

  // Deletar um item
  async delete(id: number): Promise<Item> {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
