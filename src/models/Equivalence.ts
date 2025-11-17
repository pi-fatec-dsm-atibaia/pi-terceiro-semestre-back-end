import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface EquivalenciaAttributes {
  id?: number;
  idDocumento: number;
  tipoEquivalencia: string;
  descricao?: string;
}

class Equivalence extends Model<EquivalenciaAttributes> implements EquivalenciaAttributes {
  public id!: number;
  public idDocumento!: number;
  public tipoEquivalencia!: string;
  public descricao?: string;
}

Equivalence.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idDocumento: { type: DataTypes.INTEGER, allowNull: false },
  tipoEquivalencia: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT }
}, {
  sequelize,
  tableName: "Equivalencia",
  modelName: "equivalences",
  timestamps: false
});

export default Equivalence;
