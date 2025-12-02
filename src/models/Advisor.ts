import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

//Interface com atributos do Orientador
export interface AdvisorAttributes {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

//Classe com atributos do Orientador
class Advisor extends Model<AdvisorAttributes> implements AdvisorAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public senha!: string;
}

//Configura atributos e integra ao Banco de Dados
Advisor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: false },
  cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(100), allowNull: false }
}, {
  sequelize,
  tableName: 'Advisor',
  modelName: 'advisors',
  timestamps: false,
});

export default Advisor;