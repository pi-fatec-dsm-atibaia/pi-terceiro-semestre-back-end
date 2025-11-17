import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface LinkAttributes {
  id?: number;
  idCurso: number;
  dtInicio: string;
  dtFim?: string;
  idOrientador: number;
}

class Link extends Model<LinkAttributes> implements LinkAttributes {
  public id!: number;
  public idCurso!: number;
  public dtInicio!: string;
  public dtFim?: string;
  public idOrientador!: number;
}

Link.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idCurso: { type: DataTypes.INTEGER, allowNull: false },
  dtInicio: { type: DataTypes.STRING(10), allowNull: false },
  dtFim: { type: DataTypes.STRING(10) },
  idOrientador: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: "Link",
  modelName: "links",
  timestamps: false
});

export default Link;
