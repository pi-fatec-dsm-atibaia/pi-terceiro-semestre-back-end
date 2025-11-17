import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { log } from 'console';

import Student from '../models/Student';
import { account } from '../utils/accountHandler';

export class StudentController {
  //Cria usuário Aluno
  async createStudent(req: Request, res: Response) {
    const result = await account.create(Student, req.body);
    res.status(result.success ? 201 : result.status || 400).json(result);
  }

  //Realiza login do Aluno
  async loginStudent(req: Request, res: Response) {
    const result = await account.login(Student, req.body);
    res.status(result.success ? 201 : result.status || 400).json(result);
  }

  //Retorna ID do Aluno
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await account.getById(Student, Number(id));

    res.status(result.success ? 200 : result.status || 400).json(result);
  }

  //Realiza envio de email e gera token de recuperação de senha
  async requestPasswordRecover(req: Request, res: Response) {
    
  }

  //Valida Token e recupera a senha
  async recoverPassword(req: Request, res: Response){

  }
}