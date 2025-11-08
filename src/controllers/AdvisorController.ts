import { Request, Response } from "express";

import Advisor from "../models/Advisor";
import { account } from "../utils/accountHandler";

export class AdvisorController {
    async createAdvisor(req: Request, res: Response) {
        const result = await account.create(Advisor, req.body);
        res.status(result.success ? 201 : result.status || 400).json(result);
    }

    //Realiza login do Aluno
    async loginAdvisor(req: Request, res: Response) {
        const result = await account.login(Advisor, req.body);
        res.status(result.success ? 201 : result.status || 400).json(result);
    }

    //Retorna ID do Aluno
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await account.getById(Advisor, Number(id));

        res.status(result.success ? 200 : result.status || 400).json(result);
    }

    //Realiza envio de email e gera token de recuperação de senha
    async requestPasswordRecover(req: Request, res: Response) {

    }

    //Valida Token e recupera a senha
    async recoverPassword(req: Request, res: Response) {

    }
}