import bcrypt from "bcrypt";
import { Model, ModelStatic } from "sequelize";

//Objeto contendo as funções genéricas relacionadas aos usuários
export const account = {
    //Cria usuário
    async create<T extends Model<any, any>>(Model: ModelStatic<T>, data: Omit<T["_creationAttributes"], "id" | "senha"> & {senha: string}){
        try{
            const hashedPassword = await bcrypt .hash(data.senha, 10);
            const user =await Model.create({
                ...data,
                senha: hashedPassword,
            } as T["_creationAttributes"]);

            const {senha, ...userData} = user.toJSON() as any;

            return {
                success: true,
                data: userData,
                message: `${Model.name} criado com sucesso!`,
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
    async login<T extends Model<any, any>>(Model: ModelStatic<T>, {email, senha}: {email: string, senha: string}) {
        try {
            const user = await Model.findOne({where: {email} as Record<string, any>});
            if (!user) {
                return { success: false, status: 404, message: "Usuário não encontrado"};
            }

            const isValidPassword = await bcrypt.compare(senha, (user as any).senha);
            if (!isValidPassword) {
                return { success: false, status: 401, message: "Senha incorreta"};
            }

            const { senha: _, ...userData } = user.toJSON() as any;

            return {
                success: true,
                message: "Login realizado com sucesso",
                data: userData,
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
    async getById<T extends Model<any, any>>(Model: ModelStatic<T>, id: number){
        const user = await Model.findByPk(id);

        try {
            if (!user) {
                return {
                    success: false,
                    status: 404,
                    message: `${Model.name || 'Usuário'} não encontrado.`,
                };
            }
    
            const {senha, ...userData} = user.toJSON();
    
            return {
                success: true,
                data: userData,
                message: `${Model.name || 'Usuário'} encontrado!`,
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