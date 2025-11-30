import { Request, Response } from "express";

import RequestM from '../models/Request';
import Student from '../models/Student';
import Equivalence from "../models/Equivalence";
import Employer from "../models/Employer";
import Company from "../models/Company";
import { Association, Model, where } from "sequelize";

//Controler da Solicitação
export class RequestController {
    // Envia solicitação com os dados fornecidos pelo aluno
    async sendRequest(req: Request, res: Response) {
        try {
            const {
                //Dados Solicitacao
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

                //Dados Empregador
                empregadorNome,
                empregadorEmail,
                empregadorRg,
                empregadorCargo,
                empresaNome,
                empresaCnpj,

                //Dados Empresa
                cnpj,
                site,
                razaoSocial,
                endereco,
            } = req.body;

            const equivalencia = await Equivalence.findByPk(idEquivalencia);

            if (!equivalencia) {
                return res.status(404).json({
                    message: "Tipo de equivalência não encontrado."
                });
            }

            if (equivalencia.tipoEquivalencia === "CTPS") {

                let empresa = await Company.findOne({
                    where: { cnpj }
                });

                if (!empresa) {
                    empresa = await Company.create({
                        cnpj,
                        razaoSocial,
                        site,
                        endereco,
                    });
                }

                let empregador = await Employer.findOne({
                    where: { email: empregadorEmail }
                });


                if (!empregador) {
                    empregador = await Employer.create({
                        nome: empregadorNome,
                        email: empregadorEmail,
                        rg: empregadorRg,
                        cargo: empregadorCargo,
                        idEmpresa: empresa.id
                    });
                }

                const result = await RequestM.create(
                    {
                        idEquivalencia,
                        protocolo,
                        dtSolicitacao,
                        statusSolicitacao,
                        observacao,
                        funcao,
                        departamento,
                        periodoTrabalho,
                        idAluno,
                        idEmpregador: empregador.id
                    }
                );
                res.status(201).json({
                    message: 'Solicitação enviada com sucesso',
                    data: { result, empregador, empresa }
                });
            }

        }
        catch (error: any) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'Dados já existem no sistema',
                    error: error.errors[0].message
                });
            }

            res.status(500).json({
                message: 'Erro ao criar solicitação',
                error: error.message
            });
        }


    }

    // Retorna as solicitações de determinado curso
    async listRequestsFromCourse(req: Request, res: Response) {

        try {
            const { id } = req.params;

            const result = await RequestM.findAll({
                include: [
                    {
                        model: Student,
                        as: "aluno",
                        where: { idCurso: id },
                        attributes: {
                            exclude: ['senha']
                        }
                    }
                ]
            });

            res.status(201).json({
                message: "Solicitações encontradas",
                data: result
            });
        }
        catch (error: any) {
            res.status(500).json({
                message: 'Não foi possível listar as solicitações',
                error: error.message
            });
        }
    }

    // Lista as solicitações dos alunos
    async listRequestsByStudent(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await RequestM.findAll({
                include: [
                    {
                        model: Student,
                        as: "aluno",
                        where: { id: id },
                        attributes: {
                            exclude: ['senha']
                        }
                    }
                ]
            })

            res.status(201).json({
                message: "Solicitações encontradas",
                data: result
            })

        }
        catch (error: any) {
            res.status(500).json({
                message: 'Não foi possível listar as solicitações',
                error: error.message
            });
        }
    }

    async updateStatus(req: Request, res: Response) {
        try {
            const { id, statusSolicitacao } = req.body;

            const r = await RequestM.findOne({
                where: {
                    id: id
                }
            })

            if (!r) {
                res.status(404).json({
                    message: "Solicitação não encontrada não encontrada."
                })
                return;
            }

            r?.set({
                statusSolicitacao: statusSolicitacao
            })

            r?.save();
            res.status(200).json({
                message: "Status da solicitação atualizado com sucesso!",
                data: r
            })

        }
        catch (error: any) {
            res.status(500).json({
                message: "Erro no servidor!"
            })
        }
    }

    async updateObs(req: Request, res: Response) {
        try {
            const { id, observacao } = req.body;

            const r = await RequestM.findOne({
                where: {
                    id: id
                }
            })

            if (!r) {
                res.status(404).json({
                    message: "Solicitação não encontrada não encontrada."
                })
                return;
            }

            r?.set({
                observacao: observacao
            })

            r?.save();
            res.status(200).json({
                message: "Observacao da solicitação atualizado com sucesso!",
                data: r
            })

        }
        catch (error: any) {
            res.status(500).json({
                message: "Erro no servidor!"
            })
        }
    }
}