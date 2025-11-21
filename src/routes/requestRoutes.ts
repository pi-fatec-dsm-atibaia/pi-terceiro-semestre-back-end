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
 *         - periodoTrabalho
 *         - dtSolicitacao
 *       properties:
 *         idEquivalencia:
 *           type: number
 *           description: Tipo de equivalência
 *         idAluno:
 *           type: integer
 *           description: Aluno
 *         statusSolicitacao:
 *           type: string
 *           description: Status da solicitacao
 *         dtSolicitacao:
 *           type: string
 *           format: date
 *           description: Data em que foi enviada a solicitação
 *         periodoTrabalho:
 *           type: string
 *           description: Período de trabalho
 */

/**
 * @swagger
 * /api/request:
 *   post:
 *     summary: Envia uma solicitação
 *     tags: [Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: Curso cadastrado com sucesso
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
 *         description: Erro ao cadastrar curso
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
 * /api/request/{id}:
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
router.get('/:id', requestController.listRequestsFromCourse);

export default router;