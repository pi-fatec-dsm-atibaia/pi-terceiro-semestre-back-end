import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { log } from "console";

import Administrator from "../models/Admin";
import { account } from "../utils/accountHandler";

//Controler do Administrador
export class AdminController {
    //Cria administrador
    async createAdmin(req: Request, res: Response) {
        const result = await account.create(Administrator, req.body);
        res.status(result.success ? 201 : result.status || 400).json(result);
    }

    //Realiza login do Administrador
    async loginAdmin(req: Request, res: Response) {
        const result = await account.login(Administrator, req.body);
        return res.status(result.success ? 201 : result.status || 400).json(result);
    }

    //Retorna ID do Aluno
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await account.getById(Administrator, Number(id));

        res.status(result.success ? 200 : result.status || 400).json(result);
    }

    //Realiza envio de email e gera token de recuperação de senha
    async requestPasswordRecover(req: Request, res: Response) {

    }

    //Valida Token e recupera a senha
    async recoverPassword(req: Request, res: Response) {

    }
}