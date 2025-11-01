import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface CourseAttributes {
  id?: number;
  nome: string;
  quantSemestre: number;
  periodo: string;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
  public id!: number;
  public nome!: string;
  public quantSemestre!: number;
  public periodo!: string;
}

Course.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  quantSemestre: { type: DataTypes.INTEGER, allowNull: false },
  periodo: { type: DataTypes.STRING(20), allowNull: false }
}, {
  sequelize,
  tableName: 'Curso',
  modelName: 'courses'
});

export default Course;
