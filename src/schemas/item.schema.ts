/**
 * @openapi
 * 
 * /item:
 *   get:
 *     summary: Retorna todos os itens
 *     tags:
 *       - Item
 *     responses:
 *       '200':
 *         description: Lista de itens
 *         content:
 *            application/json: 
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 *   post:
 *     summary: Cria um novo item
 *     tags:
 *       - Item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       '201':
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
 * /item/{id}:
 *   get:
 *     summary: Retorna um item pelo ID
 *     tags:
 *       - Item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser retornado
 *     responses:
 *       '200':
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '404':
 *         description: Item não encontrado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 *   put:
 *     summary: Atualiza um item pelo ID
 *     tags:
 *       - Item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInputPartial'
 *     responses:
 *       '200':
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Item não encontrado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 *   delete:
 *     summary: Deleta um item pelo ID
 *     tags:
 *       - Item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser deletado
 *     responses:
 *       '204':
 *         description: Item deletado com sucesso
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Item não encontrado
 *       '500':
 *         description: Erro interno do servidor
 *     security:
 *       - bearerAuth: []
 * 
 * components:
 *   schemas:
 *     ItemInput:
 *       type: object
 *       required:
 *         - nome
 *         - valor
 *         - carrinhoId
 *       properties:
 *         nome:
 *           type: string
 *           example: 'Item Exemplo'
 *         valor:
 *           type: number
 *           format: float
 *           example: 19.99
 *         carrinhoId:
 *           type: integer
 *           example: 1
 * 
 *     ItemInputPartial:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: 'Item Exemplo'
 *         valor:
 *           type: number
 *           format: float
 *           example: 19.99
 *         carrinhoId:
 *           type: integer
 *           example: 1
 * 
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: 'Item Exemplo'
 *         valor:
 *           type: number
 *           format: float
 *           example: 19.99
 *         carrinhoId:
 *           type: integer
 *           example: 1
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
