import { Request, Response } from 'express';
import Document from '../models/Document';
import RequestModel from '../models/Request';
import path from 'path';

export class DocumentController {
  async uploadForRequest(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
      }

      const idSolicitacao = req.body.idSolicitacao || req.params.idSolicitacao;
      const tipoArquivo = req.body.tipoArquivo || req.file.mimetype;

      if (!idSolicitacao) {
        return res.status(400).json({ message: 'idSolicitacao é obrigatório.' });
      }

      const solicitacao = await RequestModel.findByPk(idSolicitacao);
      if (!solicitacao) {
        return res.status(404).json({ message: 'Solicitação não encontrada.' });
      }

      const protocol = req.protocol;
      const host = req.get('host');
      const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

      const doc = await Document.create({
        idSolicitacao: Number(idSolicitacao),
        tipoArquivo,
        arquivo: fileUrl
      });

      return res.status(201).json({
        message: 'Arquivo enviado e registro criado com sucesso.',
        data: doc
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: 'Erro no upload.', error: error.message });
    }
  }
}
