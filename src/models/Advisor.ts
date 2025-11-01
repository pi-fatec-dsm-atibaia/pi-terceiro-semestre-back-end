import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface AdvisorAttributes {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

class Advisor extends Model<AdvisorAttributes> implements AdvisorAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public senha!: string;
}

Advisor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  cpf: { type: DataTypes.STRING(14), allowNull: false },
  senha: { type: DataTypes.STRING(100), allowNull: false }
}, {
  sequelize,
  tableName: 'Orientador',
  modelName: 'Advisor'
});

export default Advisor;