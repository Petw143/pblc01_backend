import { Router, Request, Response, NextFunction } from 'express';
import { ItemController } from '../controllers/item.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const itemController = new ItemController();

// Rotas públicas
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  itemController.getAllItems(req, res).catch(next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  itemController.getItemById(req, res).catch(next);
});

// Rotas protegidas (com autenticação)
router.post('/', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  itemController.createItem(req, res).catch(next);
});

router.put('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  itemController.updateItem(req, res).catch(next);
});

router.delete('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  itemController.deleteItem(req, res).catch(next);
});

export default router;
