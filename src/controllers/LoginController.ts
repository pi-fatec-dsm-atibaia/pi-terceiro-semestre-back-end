import { Request, Response } from 'express';

import Student from '../models/Student';
import { account } from '../utils/accountHandler';
import Advisor from '../models/Advisor';
import Administrator from '../models/Admin';

export class LoginController {
  async login(req: Request, res: Response) {
    const resultStudent = await account.login(Student, req.body);
    const resultAdvisor = await account.login(Advisor, req.body);
    const resultAdmin = await account.login(Administrator, req.body);

    if (resultStudent.success) {
      res.status(200).json({...resultStudent, role: "student"});
    }
    if (resultAdvisor.success) {
      res.status(200).json({...resultAdvisor, role: "advisor"});
    } 
    if (resultAdmin.success) {
      res.status(200).json({...resultAdmin, role: "admin"});
    } 
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
}