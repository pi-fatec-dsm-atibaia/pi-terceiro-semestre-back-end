import { RequestController } from "../controllers/RequestController";
import { Router } from "express";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipoEquivalencia:
 *                 type: string
 *               protocolo:
 *                 type: string
 *               dtSolicitacao:
 *                 type: string
 *                 format: date
 *               statusSolicitacao:
 *                 type: string
 *               observacao:
 *                 type: string
 *               funcao:
 *                 type: string
 *               departamento:
 *                 type: string
 *               periodoTrabalho:
 *                 type: string
 *               idAluno:
 *                 type: integer
 *
 *               empregadorNome:
 *                 type: string
 *               empregadorEmail:
 *                 type: string
 *               empregadorRg:
 *                 type: string
 *               empregadorCargo:
 *                 type: string
 *               empresaNome:
 *                 type: string
 *               empresaCnpj:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               site:
 *                 type: string
 *               razaoSocial:
 *                 type: string
 *               endereco:
 *                 type: string
 *
 *               # ---- DOCUMENTOS (FILES) ----
 *               Informativo_CTPS:
 *                 type: string
 *                 format: binary
 *               Registro_CTPS:
 *                 type: string
 *                 format: binary
 *               Cópia_da_Identidade Militar:
 *                 type: string
 *                 format: binary
 *               Histórico_de_Atividades:
 *                 type: string
 *                 format: binary
 *               Comprovante_de_Inscrição:
 *                 type: string
 *                 format: binary
 *               Declaração_do_Contador_da_Empresa:
 *                 type: string
 *                 format: binary
 *               Declaração_de_atividade_exercida:
 *                 type: string
 *                 format: binary
 *               Contrato_Social_da_Empresa:
 *                 type: string
 *                 format: binary
 *
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

router.post(
  "/",
  upload.fields([
    { name: "Informativo_CTPS", maxCount: 1 },
    { name: "Registro_CTPS", maxCount: 1 },
    { name: "Cópia_da_Identidade Militar", maxCount: 1 },
    { name: "Histórico_de_Atividades", maxCount: 1 },
    { name: "Comprovante_de_Inscrição", maxCount: 1 },
    { name: "Declaração_do_Contador_da_Empresa", maxCount: 1 },
    { name: "Declaração_de_atividade_exercida", maxCount: 1 },
    { name: "Contrato_Social_da_Empresa", maxCount: 1 },
    { name: "Declaração_do_Contador_da_Empresa", maxCount: 1 },
  ]),
  requestController.sendRequest
);



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