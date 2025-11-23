import { LinkController } from "../controllers/LinkController";
import { Router } from "express";

const router = Router();
const linkController = new LinkController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Link:
 *       type: object
 *       required:
 *         - idCurso
 *         - dtInicio
 *         - dtFim
 *         - idOrientador
 *       properties:
 *         idCurso:
 *           type: number
 *           description: Id do curso
 *         dtInicio:
 *           type: string
 *           description: Data de inicio
 *           format: date
 *         dtFim:
 *           type: string
 *           description: Data do fim
 *           format: date
 *         idOrientador:
 *           type: number
 *           description: Id do orientador
 */

/**
 * @swagger
 * /api/link/advisorToCourse:
 *   post:
 *     summary: Vincula orientador a um curso
 *     tags: [Links]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Link'
 *     responses:
 *       201:
 *         description: Curso cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Link'
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
 *         description: Erro ao cadastrar vinculo
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

router.post('/advisorToCourse', linkController.linkAdvisorToCourse);


/**
 * @swagger
 * /api/link/advisorToCourse/update:
 *   put:
 *     summary: Atualiza vinculo de orientador com curso
 *     tags: [Links]
 *     description: Atualiza vinculo
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
 *                 description: id do vínculo
 *               idCurso:
 *                 type: number
 *                 description: id do curso
 *               idOrientador:
 *                 type: number
 *                 description: id do orientador
 *               dtInicio:
 *                 type: string
 *                 description: data de inicio
 *                 format: date
 *               dtFim:
 *                 type: string
 *                 description: data de fim
 *                 format: date
 *     responses:
 *       200:
 *         description: Vinculo atualizado com sucesso
 *       400:
 *         description: 
 */
router.put('/advisorToCourse/update', linkController.updateAdvisorToCourse);


/**
 * @swagger
 * /api/link/advisorToCourse/{idOrientador}:
 *   get:
 *     summary: Busca vínculo de um orientador
 *     tags: [Links]
 *     parameters:
 *       - in: path
 *         name: idOrientador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do orientador
 *     responses:
 *       200:
 *         description: Vínculo encontrao
 *       404:
 *         description: Não há vínculos com este orientador
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/advisorToCourse/:idOrientador', linkController.getLinkAdvisorToCourse);

export default router;