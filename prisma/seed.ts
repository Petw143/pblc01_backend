import { PrismaClient, TipoCartao } from '@prisma/client'; // Adicione TipoCartao
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed...');
  const senhaHash = await argon2.hash('hashedPassword'); // Use senhaHash

  // Usuário Cliente
  const clienteUsuario = await prisma.usuario.create({
    data: {
      nome: 'João Cliente',
      email: 'cliente@example.com',
      senha: senhaHash, // Corrigido
      tipo: 'CLIENTE',
      imagemPerfil: null,
      cliente: {
        create: {
          cupons: {
            create: [
              {
                nome: 'DESCONTO10',
                dataValidade: new Date(Date.now() + 7 * 86400000),
                desconto: 0.1,
              },
            ],
          },
        },
      },
      endereco: {
        create: {
          rua: 'Rua das Flores',
          bairro: 'Centro',
          cep: '12345-678',
          numero: '123',
          complemento: 'Apto 45',
        },
      },
      cartoes: {
        create: [
          {
            tipoCartao: TipoCartao.CREDITO,
            numeroCartao: '4111111111111111',
            cvc: 123,
            nomeCartao: 'JOAO CLIENTE',
            dataValidade: new Date('2026-12-01'),
          },
        ],
      },
    },
    include: {
      cliente: true,
    },
  });

  const fornecedorUsuario = await prisma.usuario.create({
    data: {
      nome: 'PetShop Legal',
      email: 'fornecedor@example.com',
      senha: senhaHash, // Corrigido
      tipo: 'FORNECEDOR',
      imagemPerfil: null,
      fornecedor: {
        create: {
          avaliacaoTotal: 4.5,
          dadosBancarios: {
            create: {
              idBanco: '001',
              numAgencia: '1234',
              tipoConta: 'Corrente',
            },
          },
        },
      },
    },
    include: {
      fornecedor: true,
    },
  });

  const fornecedorId = fornecedorUsuario.fornecedor?.id ?? 0;

  const produto = await prisma.produto.create({ // ou prisma.product.create
    data: {
      nome: 'Ração Premium 10kg',
      valor: 129.9,
      quantidade: 10,
      fornecedorId,
    },
  });

  const servico = await prisma.servico.create({ // ou prisma.service.create
    data: {
      nome: 'Banho e Tosa',
      valor: 60,
      dataAgendada: new Date(),
      fornecedorId,
    },
  });

  await prisma.avaliacao.create({ // ou prisma.rating.create
    data: {
      nota: 5,
      fornecedorId,
    },
  });

  await prisma.carrinhoCompras.create({
    data: {
      clienteId: clienteUsuario.cliente?.id ?? 0,
      items: {
        create: [
          {
            nome: 'Ração Premium 10kg',
            valor: 129.9,
            produto: {
              connect: { id: produto.id },
            },
          },
          {
            nome: 'Banho e Tosa',
            valor: 60,
            servico: {
              connect: { id: servico.id },
            },
          },
        ],
      },
    },
  });

  console.log('🌱 Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
