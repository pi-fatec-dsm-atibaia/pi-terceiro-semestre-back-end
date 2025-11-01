import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface StudentAttributes {
  id?: number;
  idCurso: number;
  ra: string;
  rg: string;
  telefone: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public id!: number;
  public idCurso!: number;
  public ra!: string;
  public rg!: string;
  public telefone!: string;
  public nome!: string;
  public email!: string;
  public cpf!: string;
  public senha!: string;
}

Student.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idCurso: { type: DataTypes.INTEGER },
  ra: { type: DataTypes.STRING(20), allowNull: false },
  rg: { type: DataTypes.STRING(20), allowNull: false },
  telefone: { type: DataTypes.STRING(20), allowNull: false },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  cpf: { type: DataTypes.STRING(14), allowNull: false },
  senha: { type: DataTypes.STRING(100), allowNull: false }
}, {
  sequelize,
  tableName: 'Aluno',
  modelName: 'Student'
});

export default Student;
