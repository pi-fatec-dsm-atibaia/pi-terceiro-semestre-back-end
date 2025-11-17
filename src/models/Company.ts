import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface CompanyAttributes {
  id?: number;
  cnpj: string;
  site?: string;
  razaoSocial: string;
  endereco: string;
}

class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  public id!: number;
  public cnpj!: string;
  public site?: string;
  public razaoSocial!: string;
  public endereco!: string;
}

Company.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cnpj: { type: DataTypes.STRING(18), allowNull: false },
  site: { type: DataTypes.STRING(100) },
  razaoSocial: { type: DataTypes.STRING(100), allowNull: false },
  endereco: { type: DataTypes.STRING(200), allowNull: false }
}, {
  sequelize,
  tableName: "Company",
  modelName: "companies",
  timestamps: false
});

export default Company;
