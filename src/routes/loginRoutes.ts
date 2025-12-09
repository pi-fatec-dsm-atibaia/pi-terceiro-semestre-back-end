import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';

const router = Router();
const loginController = new LoginController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - ra
 *         - rg
 *         - senha
 *         - email
 *         - telefone
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do aluno
 *         cpf:
 *           type: string
 *           description: CPF do aluno (11 dígitos)
 *         ra:
 *           type: string
 *           description: Registro Acadêmico do aluno
 *         rg:
 *           type: string
 *           description: RG do aluno
 *         senha:
 *           type: string
 *           description: Senha do aluno
 *         email:
 *           type: string
 *           description: Email do aluno
 *         telefone:
 *           type: string
 *           description: Telefone do aluno
 */



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza login
 *     tags: [Students]
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
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post('', loginController.login);

export default router;