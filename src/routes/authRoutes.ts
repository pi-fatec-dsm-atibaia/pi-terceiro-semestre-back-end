import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const auth = new AuthController();


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicita recuperação de senha por e-mail
 *     description: Envia um e-mail de recuperação contendo um token JWT para redefinir a senha. Funciona tanto para aluno quanto orientador.
 *     tags:
 *       - Autenticação
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
 *                 example: aluno@email.com
 *                 description: E-mail do aluno ou orientador.
 *     responses:
 *       200:
 *         description: E-mail de recuperação enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail enviado com sucesso!
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado.
 *       500:
 *         description: Erro interno ao enviar o e-mail.
 */
router.post("/forgot-password", auth.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário usando token enviado por e-mail
 *     description: Atualiza a senha do aluno ou orientador após validar o token JWT da recuperação.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT recebido no e-mail.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               newPassword:
 *                 type: string
 *                 description: Nova senha do usuário.
 *                 example: NovaSenha123
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso.
 *       400:
 *         description: Token inválido ou expirado.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post("/reset-password", auth.resetPassword);

export default router;