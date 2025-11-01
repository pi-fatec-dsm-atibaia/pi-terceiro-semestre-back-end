import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
// import { Course } from "./Course";

export interface AdvisorAttributes {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    cursoId?: number | null;
}

class Advisor extends Model<AdvisorAttributes> implements AdvisorAttributes {
    public id!: number;
    public nome!: string;
    public email!: string;
    public cpf!: string;
}

Advisor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Advisor',
    tableName: 'advisors'
})

export default Advisor;