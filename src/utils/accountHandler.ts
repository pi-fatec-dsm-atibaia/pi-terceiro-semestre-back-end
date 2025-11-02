import bcrypt from "bcrypt";
import { Op } from "sequelize";

//Objeto contendo as funções genéricas relacionadas aos usuários
export const account = {
    //Cria usuário
    async create(Model: any, data: any){
        try{
            const hashedPassword = await bcrypt .hash(data.senha, 10);
            const user =await Model.create({
                ...data,
                senha: hashedPassword,
            });

            const {senha, ...userData} = user.toJSON();

            return {
                success: true,
                data: userData,
                message: `${Model.modelName} criado com sucesso!`,
            };
        }catch (error: any){
            if (error.name === "SequelizeUniqueConstraintError"){
                return {
                    sucess: false,
                    status: 400,
                    message: "Dados já existem no sistema",
                    error: error.errors[0].message,
                };
            }

            return {
                success: false,
                status: 500,
                message: "Erro interno do servidor",
                error: error.message,
            };
        }
    },

    //Realiza login do usuário
    async login(Model: any, {email, senha}: {email: string, senha: string}) {
        try {
            const user = await Model.findOne({where: {email}});
            if (!user) {
                return { success: false, status: 404, message: "Usuário não encontrado"};
            }

            const isValidPassword = await bcrypt.compare(senha, user.senha);
            if (!isValidPassword) {
                return { success: false, status: 401, message: "Senha incorreta"};
            }

            return {
                success: true,
                message: "Login realizado com sucesso",
            };
        } catch (error: any) {
            return {
                success: false,
                status: 500,
                message: "Erro interno ao efetuar login",
                error: error.message,
            };
        }
    },

    //Retorna ID do usuário
    async getById(Model: any, id: number){
        const user = await Model.findByPk(id);

        try {
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: `${Model.modelName || 'Usuário'} não encontrado.`,
                };
            }
    
            const {senha, ...userData} = user.toJSON();
    
            return {
                success: true,
                data: userData,
                message: `${Model.modelName || 'Usuário'} encontrado!`,
            };
        } catch (error: any) {
            return {
                success: false,
                status: 500,
                message: "Erro ao buscar usuário",
                error: error.message,
            };
        }

    },

    //Precisa Desenvolver
    async requestPasswordRecover(Model: any, { email }: { email: string }){
        try {
            
        } catch (error) {
            
        }
    },

    //Precisa Desenvolver
    async passwordRecover(Model: any, { email }: { email: string }){
        try {
            
        } catch (error) {
            
        }
    }
}