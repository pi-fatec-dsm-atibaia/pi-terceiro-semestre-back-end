import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

//Interface com atributos do Curso
export interface CourseAttributes {
  id?: number;
  nome: string;
  quantSemestre: number;
  periodo: string;
  codigo: string;
}

//Classe com atributos do Orientador
class Course extends Model<CourseAttributes> implements CourseAttributes {
  public id!: number;
  public nome!: string;
  public quantSemestre!: number;
  public periodo!: string;
  public codigo!: string;
}

//Configura atributos e integra ao Banco de Dados
Course.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  quantSemestre: { type: DataTypes.INTEGER, allowNull: false },
  periodo: { type: DataTypes.STRING(20), allowNull: false },
  codigo: {type: DataTypes.STRING(20), allowNull: false}
}, {
  sequelize,
  tableName: 'Course',
  modelName: 'courses',
  timestamps: false,
});

export default Course;
