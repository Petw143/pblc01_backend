import { PrismaClient } from 'prisma';

const prisma = new PrismaClient();

export const findSerByNome = async (nome: string) => {
    return prisma.ser.findUnique({ where: { nome } });
};