import { Request, Response } from "express";

import Links from '../models/Links';

export class LinkController{
    async linkAdvisorToCourse(req: Request, res: Response){
        try{
            const {id,idCurso,dtInicio,dtFim,idOrientador} = req.body;

            const result = await Links.create({id,idCurso,dtInicio,dtFim,idOrientador});

            res.status(200).json({
                message: "Vínculo de orientador e curso criado com sucesso",
                data: result
            })
        }
        catch (error : any){
            res.status(500).json({
                message: "Erro ao criar vínculo",
                error: error.message
            })
        }
    }

    async updateAdvisorToCourse(req: Request, res: Response){
        try{
            const {id,idCurso,dtInicio,dtFim,idOrientador} = req.body;
            const link = await Links.findOne({where: {id: id}});


            if (!link){
                res.status(404).json({
                    message: "Vínculo não encontrado."
                })
                return;
            }

            link?.set({
                idCurso: idCurso,
                dtInicio: dtInicio,
                dtFim: dtFim,
                idOrientador: idOrientador
            })

            link?.save();

            res.status(200).json({
                message: "Vinculo de orientador e curso atualizado com sucesso!",
                data: link
            })
        }
        catch(error : any){
            res.status(500).json({
                message: "Erro no servidor!"
            })
        }
    }

    //
    async getLinkAdvisorToCourse(req: Request, res: Response){
        try{
            const {idOrientador} = req.params

            const link = await Links.findOne({
                where:{
                    idOrientador: idOrientador
                }
            })

            if (!link){
                res.status(404).json({
                    message: "Vínculo não encontrado."
                })
                return;
            }

            res.status(200).json({
                message: "Vínculo encontrado",
                data: link
            })

        }
        catch (error: any){
            res.status(500).json({
                message: "Error"
            })
        }
    }

    async linkEmployerToCTPS(req: Request, res: Response){
        try {
            const { idSolicitacao } = req.params;
            const { nome, email, rg, cargo, idEmpresa } = req.body;

            //const 
        } catch (error) {
            
        }
    }
}