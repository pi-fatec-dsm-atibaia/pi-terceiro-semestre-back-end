import { Router } from "express";
import { AdvisorController } from "../controllers/AdvisorController";

const router = Router();
const advisorController = new AdvisorController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Advisor:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - senha
 *         - email
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do orientador
 *         cpf:
 *           type: string
 *           description: CPF do orientador (11 dígitos)
 *         senha:
 *           type: string
 *           description: Senha do orientador
 *         email:
 *           type: string
 *           description: Email do orientador
 */

/**
 * @swagger
 * /api/advisors/create-advisor:
 *   post:
 *     summary: Cadastra um novo orientador
 *     tags: [Advisor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advisor'
 *     responses:
 *       201:
 *         description: Orientador cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Advisor'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/create-advisor', advisorController.createAdvisor);

/**
 * @swagger
 * /api/advisors/login-advisor:
 *   post:
 *     summary: Realiza login de um orientador
 *     tags: [Advisor]
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
 *                 description: Email do orientador
 *               senha:
 *                 type: string
 *                 description: Senha do orientador
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Orientador não encontrado
 *       500:
 *         description: Erro interno ao efetuar login
 */
router.post('/login-advisor', advisorController.loginAdvisor);

/**
 * @swagger
 * /api/advisors/{id}:
 *   get:
 *     summary: Busca um orientador pelo ID
 *     tags: [Advisor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do orientador
 *     responses:
 *       200:
 *         description: Orientador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advisor'
 *       404:
 *         description: Orientador não encontrado
 *       500:
 *         description: Erro ao buscar orientador
 */
router.get('/:id', advisorController.getById);

/**
 * @swagger
 * /api/advisors/recover-password:
 *   post:
 *     summary: Solicita recuperação de senha
 *     tags: [Advisor]
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
 *                 description: Email do orientador
 *     responses:
 *       200:
 *         description: Solicitação de recuperação de senha enviada
 *       404:
 *         description: Orientador não encontrado
 *       500:
 *         description: Erro ao solicitar recuperação
 */
router.post('/recover-password', advisorController.requestPasswordRecover);

/**
 * @swagger
 * /api/advisors/recover-password:
 *   put:
 *     summary: Redefine a senha do orientador
 *     tags: [Advisor]
 *     description: Atualiza a senha do orientador com base no token de recuperação.
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
 *                 description: Nova senha do orientador
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao redefinir senha
 */
router.put('/recover-password', advisorController.recoverPassword);

export default router;
