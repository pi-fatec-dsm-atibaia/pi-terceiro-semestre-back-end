import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Student from '../models/Student';

export class StudentController {
  async create(req: Request, res: Response) {
    try {
      const { nome, cpf, ra, rg, senha, email, telefone } = req.body;

      const hashedPassword = await bcrypt.hash(senha, 10);

      const student = await Student.create({
        nome,
        cpf,
        ra,
        rg,
        senha: hashedPassword,
        email,
        telefone
      });

      const { senha: _, ...studentData } = student.toJSON();
      
      res.status(201).json({
        message: 'Aluno cadastrado com sucesso',
        data: studentData
      });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          message: 'Dados já existem no sistema',
          error: error.errors[0].message
        });
      }
      
      res.status(500).json({
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const student = await Student.findByPk(id);
      
      if (!student) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }

      const { senha: _, ...studentData } = student.toJSON();
      
      res.json({ data: studentData });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      
      const student = await Student.findOne({ where: { email } });
      
      if (!student) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isValidPassword = await bcrypt.compare(senha, student.senha);
      
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const { senha: _, ...studentData } = student.toJSON();
      
      res.json({
        message: 'Login realizado com sucesso',
        data: studentData
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if  (!email) return res.status(400).json({ message: 'Email é obrigatório' });
      
      const student = await Student.findOne({where: {email: email}});

      console.log("student banco", student)
      
      if (!student) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }

      const sendEmail = () => {
        return "Email enviado com sucesso"
      }
      
      res.json({ data: sendEmail() });
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
}