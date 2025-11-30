import { EmployerController } from "../controllers/EmployerController";
import { Router } from "express";

const router = Router();
const employerController = new EmployerController();


/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       required:
 *         - id
 *         - nome
 *         - rg
 *         - email
 *         - cargo
 *         - idEmpresa
 *       properties:
 *         id:
 *           type: number
 *           description: Id do empregador
 *         nome:
 *           type: string
 *           description: Nome completo do empregador
 *         rg:
 *           type: string
 *           description: RG do empregador
 *         email:
 *           type: string
 *           description: Email do empregador
 *         cargo:
 *           type: string
 *           description: Cargo do empregador
 *         idEmpresa:
 *           type: number
 *           description: ID da empresa do empregador
 */

/**
 * @swagger
 * /api/Employer:
 *   post:
 *     summary: Cadastra um empregador
 *     tags: [Employer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
 *     responses:
 *       201:
 *         description: Empregador cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou já existentes
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', employerController.create);

/**
 * @swagger
 * /api/Employer/update:
 *   put:
 *     summary: Atualiza um empregador
 *     tags: [Employer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
 *     responses:
 *       201:
 *         description: Empregador atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou já existentes
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/update', employerController.update);




/**
 * @swagger
 * /api/Employer/{id}:
 *   get:
 *     summary: Busca um aluno por ID
 *     tags: [Employer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
*           type: number
 *         description: Id do empregador
 *     responses:
 *       200:
 *         description: Empregador encontrado
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/:id', employerController.findById);


/**
 * @swagger
 * /api/employer/send:
 *   post:
 *     summary: Envia email para o empregador
 *     description: 
 *     tags:
 *       - Employer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - email
 *             properties:
 *               id:
 *                 type: number
 *                 description: id do empregador.
 *               email:
 *                 type: string
 *                 example: empregador@email.com
 *                 description: E-mail do empregador.
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
router.post('/send', employerController.sendEmployer);



/**
 * @swagger
 * /api/employer/verify:
 *   post:
 *     summary: Verifica empregador
 *     description: 
 *     tags:
 *       - Employer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT recebido no e-mail.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
router.post('/verify', employerController.verifyEmployer);


export default router