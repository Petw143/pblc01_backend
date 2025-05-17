import { PrismaClient, Produto } from '@prisma/client';

export class ProductRepository {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async findAll(): Promise<Produto[]> {
        return this.prisma.produto.findMany();
    }

    async findById(id: number): Promise<Produto | null> {
        return this.prisma.produto.findUnique({
            where: { id },
        });
    }

    async create(data: {
        nome: string;
        valor: number;
        quantidade: number;
        fornecedorId: number;
    }): Promise<Produto> {
        const { fornecedorId, ...produtoData } = data;

        return this.prisma.produto.create({
            data: {
                ...produtoData,
                fornecedor: {
                    connect: { id: fornecedorId },
                },
            },
        });
    }

    async update(id: number, data: {
        nome?: string;
        valor?: number;
        quantidade?: number;
    }): Promise<Produto> {
        return this.prisma.produto.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Produto> {
        return this.prisma.produto.delete({ where: { id } });
    }
}
