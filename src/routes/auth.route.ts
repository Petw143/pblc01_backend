import express from 'express';
import { AuthController } from '../controllers/auth.controller'; // Ajuste o caminho se necessário

const router = express.Router();
const authController = new AuthController();

// Rota para registo de novo utilizador
router.post('/register', authController.register);

// Rota para login de utilizador
router.post('/login', authController.login);

// Rota para verificar a validade do JWT
router.get('/verify', authController.verifyJWT);


export default router;
