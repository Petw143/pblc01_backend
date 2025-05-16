import { Router, Request, Response, NextFunction } from 'express'; // Importe os tipos Request, Response e NextFunction
import { ProdutoController } from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const produtoController = new ProdutoController();

// Rotas públicas
router.get('/', (req: Request, res: Response, next: NextFunction) => {  // Adicione os tipos
    produtoController.obterTodosProdutos(req, res, next);
});
router.get('/:id', (req: Request, res: Response, next: NextFunction) => { // Adicione os tipos
    produtoController.obterProdutoPorId(req, res, next);
});

// Rotas protegidas com JWT (requerem autenticação)
router.post('/', authMiddleware, (req: Request, res: Response, next: NextFunction) => { // Adicione os tipos
    produtoController.criarProduto(req, res, next);
});
router.put('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => { // Adicione os tipos
    produtoController.atualizarProduto(req, res, next);
});
router.delete('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => { // Adicione os tipos
    produtoController.apagarProduto(req, res, next);
});

export default router;
