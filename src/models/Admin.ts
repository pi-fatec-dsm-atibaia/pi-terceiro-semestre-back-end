import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface AdministratorAttributes {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

class Administrator extends Model<AdministratorAttributes> implements AdministratorAttributes {
  public id!: number;
  public cpf!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;
}

Administrator.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cpf: { type: DataTypes.STRING(14), allowNull: false, unique: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  senha: { type: DataTypes.STRING(100), allowNull: false }
}, {
  sequelize,
  tableName: 'Administrador',
  modelName: 'administrators'
});

export default Administrator;
