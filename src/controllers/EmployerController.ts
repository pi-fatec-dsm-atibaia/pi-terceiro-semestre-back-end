import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Employer from "../models/Employer"
import { generateEmployerToken } from "../utils/generateEmployerToken";
import { MailService } from "../services/MailService";
import { decode } from "punycode";

export class EmployerController{
    async create(req: Request, res: Response){
        try{
            const {id, nome, email, rg, cargo, idEmpresa} = req.body;


            const p = await Employer.findOne({where: {email: email}})

            if (!p){

                const p = await Employer.create({id, nome, email, rg, cargo, idEmpresa})
            }

            res.status(200).json({
                message: "Empregado cadastrado com sucesso",
                data: p
            })
        }
        catch (error : any){
            res.status(500).json({
                message: "Erro no servidor",
                error: error.message
            })
        }
    }

    async update(req: Request, res: Response){
        try{
            const {id, nome, email, rg, cargo, idEmpresa} = req.body;


            const p = await Employer.findOne({where: {id: id}})

            if (!p){
                return res.status(404).json({
                    message: "Empregador não encontrado"
                })
            }

            p.set({
                nome: nome,
                email: email,
                rg: rg,
                cargo: cargo,
                idEmpresa: idEmpresa
            })

            p.save();
            res.status(200).json({
                message: "Empregador atualizado com sucesso!",
                data: p
            })
        }
        catch(error: any){
            res.status(500).json({
                message: "Erro no servidor!",
                error: error
            })
        }
    }

    async findById(req: Request, res: Response){
        try{
            const {id} = req.params

            const e = await Employer.findOne({where: {id: id}})

            if (!e) {
                res.status(404).json({
                    message: "Empregador não encontrado"
                })
                return
            }

            res.status(200).json({
                message: "Empregador encontrado com sucesso",
                data: e
            })
        }
        catch(error : any){
            res.status(500).json({
                message: "Erro no servidor!",
                error: error
            })
        }
    }

    async sendEmployer(req: Request, res: Response){
        try{
            const { id, email } = req.body;

            const token = generateEmployerToken(id, email);
            const mail = new MailService();
            await mail.sendEmployerToken(email, token);

            return res.status(200).json({
                message: "E-mail de recuperação enviado com sucesso!"
            });
        }
        catch (error: any){
            res.status(500).json({
                message: "Erro no servidor!",
                error: error
            })
        }
    }

    async verifyEmployer(req: Request, res: Response){
        try{
            const {token} = req.body;

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            const {id, email} = decoded;

            const e = await Employer.findOne({where: {
                id: id,
                email: email
            }})

            if (!e){
                return res.status(404).json({
                    message: "Empregador não encontrado"
                })
            }



            return res.status(200).json({
                message: "Empregador encontrado",
                data: e
            });
        }
        catch(error: any){
            res.status(500).json({
                message: "Erro no servidor!",
                error: error
            })
        }
    }
}