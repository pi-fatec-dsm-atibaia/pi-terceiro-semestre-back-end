import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface CourseRegistrationAttributes {
  idAdministrador: number;
  idCurso: number;
}

class CourseRegistration extends Model<CourseRegistrationAttributes> implements CourseRegistrationAttributes {
  public idAdministrador!: number;
  public idCurso!: number;
}

CourseRegistration.init({
  idAdministrador: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  idCurso: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true }
}, {
  sequelize,
  tableName: "CourseRegistration",
  modelName: "courseRegistrations",
  timestamps: false
});

export default CourseRegistration;
