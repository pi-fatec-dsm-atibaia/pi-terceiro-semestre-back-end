import { Request, Response} from "express"
import Equivalence from "../models/Equivalence";

export class EquivalenceController{
    async getById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const equivalence = await Equivalence.findByPk(id);
            
            if (!equivalence){
                res.status(404).json({
                    sucess: false,
                    message: 'Equivalência não encontrada.',
                })
            }

            res.status(200).json({
                message: 'Curso encontrado!',
                data: equivalence,
            })
        } catch (error: any) {
            res.status(500).json({
                message: 'Erro interno do servidor',
                error: error.message,
            })
        };
    }
}