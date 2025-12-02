import { Request, Response } from 'express';
import Course from '../models/Course';

export class CourseController {
    //Cria tabela de curso
    async create(req: Request, res: Response) {
        try {
            const {id, nome, quantSemestre, periodo,codigo} = req.body;

            const course = await Course.create({
                id,
                nome,
                quantSemestre,
                periodo,
                codigo
            });

            res.status(201).json({
                message: 'Curso cadastrado com sucesso',
                data: course
            });
        } catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'Dados já existem no sistema',
                    error: error.errors[0].message
                });
            }

            res.status(500).json({
                message: 'Erro ao cadastrar curso',
                error: error.message
            });
        }
    }
}