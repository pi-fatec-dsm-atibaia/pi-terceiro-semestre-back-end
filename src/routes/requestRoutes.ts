import { RequestController } from "../controllers/RequestController";
import { Router } from "express";

const router = Router();
const requestController = new RequestController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       required:
 *         - idEquivalencia
 *         - idAluno
 *         - statusSolicitacao
 *         - dtSolicitacao
 *       properties:
 *         idEquivalencia:
 *           type: number
 *           description: ID do tipo de equivalência
 *         idAluno:
 *           type: integer
 *           description: ID do aluno
 *         statusSolicitacao:
 *           type: string
 *           description: Status da solicitação
 *         dtSolicitacao:
 *           type: string
 *           format: date
 *           description: Data da solicitação
 *         periodoTrabalho:
 *           type: string
 *           description: Período de trabalho
 *         protocolo:
 *           type: string
 *           description: Protocolo da solicitação
 *         observacao:
 *           type: string
 *           description: Observações adicionais
 *         funcao:
 *           type: string
 *           description: Função exercida
 *         departamento:
 *           type: string
 *           description: Departamento do aluno
 *
 *         # EMPREGADOR
 *         empregadorNome:
 *           type: string
 *           description: Nome do empregador
 *         empregadorEmail:
 *           type: string
 *           description: Email do empregador
 *         empregadorRg:
 *           type: string
 *           description: RG do empregador
 *         empregadorCargo:
 *           type: string
 *           description: Cargo do empregador
 *
 *         # EMPRESA
 *         cnpj:
 *           type: string
 *           description: CNPJ da empresa
 *         empresaNome:
 *           type: string
 *           description: Nome fantasia da empresa
 *         razaoSocial:
 *           type: string
 *           description: Razão social da empresa
 *         site:
 *           type: string
 *           description: Site da empresa
 *         endereco:
 *           type: string
 *           description: Endereço da empresa
 */

/**
 * @swagger
 * /api/request:
 *   post:
 *     summary: Envia uma solicitação de equivalência
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: Solicitação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Request'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Erro interno ao enviar solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.post('/', requestController.sendRequest);


/**
 * @swagger
 * /api/request/course/{id}:
 *   get:
 *     summary: Busca solicitações por id do curso
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Solicitações encontradas
 *       404:
 *         description: Não há solicitações
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/course/:id', requestController.listRequestsFromCourse);

/**
 * @swagger
 * /api/request/student/{id}:
 *   get:
 *     summary: Busca solicitações por id do aluno
 *     tags: [Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Solicitações encontradas
 *       404:
 *         description: Não há solicitações
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/student/:id', requestController.listRequestsByStudent);


/**
 * @swagger
 * /api/request/status/:
 *   put:
 *     summary: Atualiza status da solicitação
 *     tags: [Request]
 *     description: Atualiza status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *                 description: id da solicitação
 *               statusSolicitacao:
 *                 type: string
 *                 description: status da solicitacao
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: 
 */
router.put('/status/', requestController.updateStatus);

/**
 * @swagger
 * /api/request/obs/:
 *   put:
 *     summary: Atualiza status da solicitação
 *     tags: [Request]
 *     description: Atualiza status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *                 description: id da solicitação
 *               observacao:
 *                 type: string
 *                 description: observacao da solicitacao
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: 
 */
router.put('/obs/', requestController.updateObs);

export default router;