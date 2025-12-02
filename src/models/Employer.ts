import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface EmpregadorAttributes {
  id?: number;
  nome: string;
  email: string;
  rg?: string;
  cargo?: string;
  idEmpresa: number;
}

class Employer extends Model<EmpregadorAttributes> implements EmpregadorAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public rg?: string;
  public cargo?: string;
  public idEmpresa!: number;
}

Employer.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  rg: { type: DataTypes.STRING(20) },
  cargo: { type: DataTypes.STRING(100) },
  idEmpresa: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  tableName: "Empregador",
  modelName: "employers",
  timestamps: false
});

export default Employer;