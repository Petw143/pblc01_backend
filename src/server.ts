import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import itemRoutes from './routes/item.route';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyPet API',
      version: '1.0.0',
      description: 'API para gerenciamento de produtos e itens do MyPet',
    },
  },
  apis: ['./routes/*.ts', './src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger - Documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas protegidas com JWT
app.use('/produto', productRoutes);

app.use('/item', itemRoutes);

// Middleware de erro genérico
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/docs`);
});
