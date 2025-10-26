import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface StudentAttributes {
  id?: number;
  nome: string;
  cpf: string;
  ra: string;
  rg: string;
  senha: string;
  email: string;
  telefone: string;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public id!: number;
  public nome!: string;
  public cpf!: string;
  public ra!: string;
  public rg!: string;
  public senha!: string;
  public email!: string;
  public telefone!: string;
}

Student.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
  },
  ra: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  rg: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Student',
  tableName: 'students'
});

export default Student;