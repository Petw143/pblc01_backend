/**
 * @openapi
 * openapi: 3.0.0
 * info:
 *   title: API de Autenticação
 *   version: 1.0.0
 * tags:
 *   - name: Autenticação
 *     description: Endpoints relacionados à autenticação (login, registro, verificação de token)
 *
 * paths:
 *   /auth/login:
 *     post:
 *       tags:
 *         - Autenticação
 *       summary: Realiza login e gera um token JWT
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginInput'
 *       responses:
 *         '200':
 *           description: Login bem-sucedido, retorna o token JWT
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *         '401':
 *           description: Credenciais inválidas (usuário não encontrado ou senha incorreta)
 *         '500':
 *           description: Erro interno ao processar o login
 *
 *   /auth/register:
 *     post:
 *       tags:
 *         - Autenticação
 *       summary: Registra um novo usuário
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       responses:
 *         '201':
 *           description: Usuário registrado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         '400':
 *           description: Requisição inválida (dados ausentes ou incorretos)
 *         '409':
 *           description: Email já está em uso
 *         '500':
 *           description: Erro interno ao processar o registro
 *
 *   /auth/verify-jwt:
 *     get:
 *       tags:
 *         - Autenticação
 *       summary: Verifica a validade de um token JWT
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Token válido, retorna dados do usuário
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 *         '401':
 *           description: Token inválido ou expirado
 *         '500':
 *           description: Erro interno ao verificar o token
 *
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@email.com
 *         senha:
 *           type: string
 *           format: password
 *           example: senha123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yUF_6kKBSz0w"
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - tipo
 *       properties:
 *         nome:
 *           type: string
 *           example: "Nome do Usuário"
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@email.com
 *         senha:
 *           type: string
 *           format: password
 *           example: senha123
 *         tipo:
 *           type: string
 *           enum:
 *             - CLIENTE
 *             - FORNECEDOR
 *           example: "CLIENTE"
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 123
 *         nome:
 *           type: string
 *           example: "Nome do Usuário"
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@email.com
 *         tipo:
 *           type: string
 *           enum:
 *             - CLIENTE
 *             - FORNECEDOR
 *           example: "CLIENTE"
 */
