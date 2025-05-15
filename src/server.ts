import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
// import outras rotas aqui, como:
// import userRoutes from './routes/userRoutes';
// import productRoutes from './routes/productRoutes';

import { authenticateJWT } from './src/middlewares/jwtMiddleware';
import swaggerDocument from './swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Swagger - Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas públicas
app.use('/auth', authRoutes);

// Exemplo de rota protegida
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida com JWT!' });
});

// Middleware de erro genérico (opcional)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger em http://localhost:${PORT}/api-docs`);
});
