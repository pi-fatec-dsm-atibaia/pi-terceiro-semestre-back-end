import { CourseController } from "../controllers/CourseController";
import { Router } from "express";

const router = Router();
const courseController = new CourseController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:  
 *       type: object
 *       required:
 *         - nome
 *         - quantSemestre
 *         - periodo
 *         - codigo
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do curso
 *         quantSemestre:
 *           type: integer
 *           description: Quantidade de semestres do curso
 *         periodo:
 *           type: string
 *           description: Período do curso
 *         codigo:
 *           type: string
 *           description: Abreviação do curso
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Cadastra um novo curso
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
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
 *                   $ref: '#/components/schemas/Course'
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

router.post('/', courseController.create);

export default router;