import { PrismaClient, Role, OrderStatus } from '@prisma/client';
import argon2 from 'argon2'; 

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed...')  
  const senhaHash = await argon2.hash('hashedPassword');   

  // Criar usuário cliente
  const userCustomer = await prisma.user.create({
    data: {
      name: 'João Cliente',
      email: 'cliente@mypet.com',
      password: senhaHash,
      role: Role.CUSTOMER,
    },
  });

  // Criar pet do cliente
  const pet = await prisma.pet.create({
    data: {
      name: 'Rex',
      type: 'Cachorro',
      userId: userCustomer.id,
    },
  });

  // Criar usuário estabelecimento
  const userBusiness = await prisma.user.create({
    data: {
      name: 'PetShop Feliz',
      email: 'petshop@mypet.com',
      password: senhaHash,
      role: Role.BUSINESS,
    },
  });

  // Criar estabelecimento
  const business = await prisma.business.create({
    data: {
      name: 'PetShop Feliz',
      description: 'Banho, tosa e produtos para pets.',
      address: 'Rua dos Pets, 123',
      phone: '(35) 99999-9999',
      userId: userBusiness.id,
    },
  });

  // Criar produto
  const product = await prisma.product.create({
    data: {
      name: 'Ração Premium 10kg',
      description: 'Ração para cães adultos',
      price: 129.90,
      businessId: business.id,
    },
  });

  // Criar serviço
  const service = await prisma.service.create({
    data: {
      name: 'Banho e Tosa',
      description: 'Serviço completo de banho e tosa',
      price: 70.00,
      businessId: business.id,
    },
  });

  // Criar pedido
  const order = await prisma.order.create({
    data: {
      userId: userCustomer.id,
      total: 199.90,
      status: OrderStatus.CONFIRMED,
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
          },
          {
            serviceId: service.id,
            quantity: 1,
            price: service.price,
          },
        ],
      },
    },
  });

  // Criar avaliação
  const review = await prisma.review.create({
    data: {
      userId: userCustomer.id,
      businessId: business.id,
      rating: 5,
      comment: 'Ótimo atendimento e serviço!',
    },
  });

  // Criar promoção
  const promotion = await prisma.promotion.create({
    data: {
      title: '20% OFF em serviços',
      discount: 0.2,
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)),
      businessId: business.id,
    },
  });

  console.log('🌱 Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
