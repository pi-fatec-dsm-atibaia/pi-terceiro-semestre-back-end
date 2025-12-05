import { Router } from "express";
import { EquivalenceController } from "../controllers/EquivalenceController";

const router = Router();
const equivalenceController = new EquivalenceController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Equivalence:  
 *       type: object
 *       required:
 *         - tipoEquivalencia
 *         - descricao
 *       properties:
 *         tipoEquivalencia:
 *           type: string
 *           description: Tipo da Equivalencia
 *         descricao:
 *           type: string
 *           description: Descrição da Equivalência
 */
/**
 * @swagger
 * /api/equivalences/{id}:
 *   get:
 *     summary: Busca uma Equivalência por ID
 *     tags: [Equivalence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da Equivalência
 *     responses:
 *       200:
 *         description: Equivalência encontrada!
 *       404:
 *         description: Equivalência não encontrada!
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', equivalenceController.getById);

export default router;