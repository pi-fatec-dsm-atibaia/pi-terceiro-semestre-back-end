import { Router } from 'express';
import { upload } from '../middleware/upload';
import { DocumentController } from '../controllers/DoumentController';

const router = Router();
const controller = new DocumentController();

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Faz upload de documento e cria registro no DB associado à solicitação
 *     tags: [Documents]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *               idSolicitacao:
 *                 type: integer
 *             required:
 *               - document
 *               - idSolicitacao
 *     responses:
 *       201:
 *         description: Upload realizado e registro criado
 */
router.post('/upload', upload.single('document'), controller.uploadForRequest.bind(controller));

export default router;
