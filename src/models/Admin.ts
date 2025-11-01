import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface AdminAttributes {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}

class Admin extends Model<AdminAttributes> implements AdminAttributes {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public telefone!: string;
}

Admin.init({
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
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins'
});

export default Admin;