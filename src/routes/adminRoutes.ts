import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const router = Router();
const adminController = new AdminController();

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
 * /api/admins/:
 *   post:
 *     summary: Cadastra um novo orientador
 *     tags: [Admin]
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
 *         description: Erro interno do servidor
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

router.post("/", adminController.createAdvisor);

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - senha
 *         - email
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do administrador
 *         cpf:
 *           type: string
 *           description: CPF do administrador (11 dígitos)
 *         senha:
 *           type: string
 *           description: Senha do administrador
 *         email:
 *           type: string
 *           description: Email do administrador
 */

/**
 * @swagger
 * /api/admins/create-admin:
 *   post:
 *     summary: Cadastra um novo administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
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
 *         description: Erro interno do servidor
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

router.post("/create-admin", adminController.createAdmin);

export default router;