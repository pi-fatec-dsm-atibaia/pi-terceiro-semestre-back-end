import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface CourseAttributes {
    id?: number;
    nome: string;
    periodo: string;
    semestre: string;
}

class Course extends Model<CourseAttributes> implements CourseAttributes {
    public id!: number;
    public nome!: string;
    public periodo!: string;
    public semestre!: string;
}

Course.init ({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses'
});

export default Course;