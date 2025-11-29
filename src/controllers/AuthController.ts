import { Request, Response } from "express";
import Student from "../models/Student";
import Advisor from "../models/Advisor";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { MailService } from "../services/MailService";
import { generateResetToken } from "../utils/generateResetToken";

export class AuthController {

    async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;

            // Procurar em aluno ou orientador
            const aluno = await Student.findOne({ where: { email } });
            const orientador = await Advisor.findOne({ where: { email } });

            if (!aluno && !orientador) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const tipo = aluno ? "aluno" : "orientador";
            const usuario = aluno ?? orientador;

            if (!usuario){
                return res.status(404).json({ message: "Usuário não encontrado."});
            }

            const token = generateResetToken(usuario.id, tipo);

            const mail = new MailService();
            await mail.sendPasswordResetEmail(email, token);

            return res.status(200).json({
                message: "E-mail de recuperação enviado com sucesso!"
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                message: "Erro ao enviar e-mail."
            });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, newPassword } = req.body;

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            const { id, tipo } = decoded;

            const usuario = tipo === "aluno"
                ? await Student.findByPk(id)
                : await Advisor.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const hash = await bcrypt.hash(newPassword, 10);

            if (tipo === "aluno"){
                const aluno = usuario as Student;
                await aluno.update({ senha: hash});
            } else {
                const orientador = usuario as Advisor;
                await orientador.update({ senha: hash});
            }

            return res.status(200).json({
                message: "Senha atualizada com sucesso!"
            });

        } catch (error: any) {
            console.error(error);
            return res.status(400).json({
                message: "Token inválido ou expirado."
            });
        }
    }
}
