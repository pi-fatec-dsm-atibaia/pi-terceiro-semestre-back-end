import { Request, Response } from "express";

import RequestM from '../models/Request';
import Student from '../models/Student';
import { Association, where } from "sequelize";

//Controler da Solicitação
export class RequestController {
    // Envia solicitação com os dados fornecidos pelo aluno
    async sendRequest(req: Request, res: Response) {
        try{
            const {
                id,
                idEquivalencia,
                protocolo,
                dtSolicitacao,
                statusSolicitacao,
                observacao,
                funcao,
                departamento,
                periodoTrabalho,
                idAluno,
                idEmpregador,
            } = req.body;


            const result = await RequestM.create(
                {id,
                idEquivalencia,
                protocolo,
                dtSolicitacao,
                statusSolicitacao,
                observacao,
                funcao,
                departamento,
                periodoTrabalho,
                idAluno,
                idEmpregador}
            );

            res.status(201).json({
                message: 'Solicitação enviada com sucesso',
                data: result
            });
        }
        catch(error : any){
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

    // Retorna as solicitações de determinado curso
    async listRequestsFromCourse(req: Request, res: Response){

        try{
            const {id} = req.params;

            const result = await RequestM.findAll({
                include: [
                    {
                        model: Student,
                        as: "aluno",
                        where: {idCurso: id}
                    }
                ]
            });


            res.status(201).json({
                message: 'Solicitação enviada com sucesso',
                data: result
            });
        }
        catch(error : any){
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'Dados já existem no sistema',
                    error: error.errors[0].message
                });
            }

            res.status(500).json({
                message: 'Não foi possível listar as solicitações',
                error: error.message
            });
        }
    }

    // Envia documento de uma solicitação
    async sendDocument(req: Request, res: Response){
        // TODO
    }
}