import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';

const router = Router();
const studentController = new StudentController();

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
 * /api/students:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Aluno cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou já existentes
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /api/students/login:
 *   post:
 *     summary: Realiza login do aluno
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
router.post('/login', studentController.loginStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', studentController.getById);


/**
 * @swagger
 * /api/students/recover-password:
 *   post:
 *     summary: Inicia o processo de recuperação de senha (mock)
 *     tags: [Students]
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
 *                 description: Email do aluno
 *     responses:
 *       400:
 *         description: O campo email é obrigatório
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.post('/recover-password', studentController.requestPasswordRecover);

/**
 * @swagger
 * /api/students/recover-password:
 *   put:
 *     summary: Redefine a senha do aluno
 *     tags: [Students]
 *     description: Atualiza a senha do aluno com base no token de recuperação.
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
 *                 description: Nova senha do aluno
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro ao redefinir senha
 */
router.put('/recover-password', studentController.recoverPassword);

export default router;