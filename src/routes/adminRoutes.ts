import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const router = Router();
const adminController = new AdminController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - senha
 *         - email
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do administrador
 *         cpf:
 *           type: string
 *           description: CPF do administrador (11 dígitos)
 *         senha:
 *           type: string
 *           description: Senha do administrador
 *         email:
 *           type: string
 *           description: Email do administrador
 */

/**
 * @swagger
 * /api/admins/create-admin:
 *   post:
 *     summary: Cadastra um novo administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Administrador cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/create-admin', adminController.createAdmin);

/**
 * @swagger
 * /api/admins/login-admin:
 *   post:
 *     summary: Realiza login de um administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do administrador
 *               senha:
 *                 type: string
 *                 description: Senha do administrador
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Administrador não encontrado
 *       500:
 *         description: Erro interno ao efetuar login
 */
router.post('/login-admin', adminController.loginAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Busca um administrador pelo ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador não encontrado
 *       500:
 *         description: Erro ao buscar administrador
 */
router.get('/:id', adminController.getById);

/**
 * @swagger
 * /api/admins/recover-password:
 *   post:
 *     summary: Solicita recuperação de senha
 *     tags: [Admin]
 *     description: Envia um email com o link de recuperação de senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do administrador
 *     responses:
 *       200:
 *         description: Solicitação de recuperação de senha enviada
 *       404:
 *         description: Administrador não encontrado
 *       500:
 *         description: Erro ao solicitar recuperação
 */
router.post('/recover-password', adminController.requestPasswordRecover);

/**
 * @swagger
 * /api/admins/recover-password:
 *   put:
 *     summary: Redefine a senha do administrador
 *     tags: [Admin]
 *     description: Atualiza a senha do administrador com base no token de recuperação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperação de senha
 *               novaSenha:
 *                 type: string
 *                 description: Nova senha do administrador
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao redefinir senha
 */
router.put('/recover-password', adminController.recoverPassword);

export default router;
