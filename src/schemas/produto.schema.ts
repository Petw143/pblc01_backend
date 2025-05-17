/**
 * @openapi
 * /produto:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags:
 *       - Produto
 *     responses:
 *       '200':
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       '500':
 *         description: Erro interno do servidor
 * 
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 * 
 * 
 * /produto/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags:
 *       - Produto
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser retornado
 *     responses:
 *       '200':
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 * 
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags:
 *       - Produto
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       '200':
 *         description: Produto atualizado com sucesso
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags:
 *       - Produto
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser deletado
 *     responses:
 *       '204':
 *         description: Produto deletado com sucesso
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Produto não encontrado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 * components:
 *   schemas:
 *     ProdutoInput:
 *       type: object
 *       required:
 *         - nome
 *         - valor
 *         - quantidade
 *         - fornecedorId
 *       properties:
 *         nome:
 *           type: string
 *           example: "Produto X"
 *         valor:
 *           type: number
 *           format: float
 *           example: 25.99
 *         quantidade:
 *           type: number
 *           format: float
 *           example: 100
 *         fornecedorId:
 *           type: integer
 *           example: 1
 * 
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Produto X"
 *         valor:
 *           type: number
 *           format: float
 *           example: 25.99
 *         quantidade:
 *           type: number
 *           format: float
 *           example: 100
 *         fornecedorId:
 *           type: integer
 *           example: 1
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
