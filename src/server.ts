import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import poderRoutes from './routes/poder.route';
import helloRoutes from './routes/hello.route';
import authRoutes from './routes/auth.route';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Divindades API',
            version: '1.0.0',
            description: 'API para gerenciar poderes, seres e artefatos mitológicos',
        },
    },
    apis: ['./src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger - Documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas públicas
app.use('/auth', authRoutes);

app.use('/hello', helloRoutes);

app.use('/poderes', authMiddleware, poderRoutes);

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
