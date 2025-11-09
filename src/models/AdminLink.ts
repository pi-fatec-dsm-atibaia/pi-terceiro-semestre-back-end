import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface AdmVinculoAttributes {
  idVinculo: number;
  idAdministrador: number;
  dtCadastro: string;
}

class AdminLink extends Model<AdmVinculoAttributes> implements AdmVinculoAttributes {
  public idVinculo!: number;
  public idAdministrador!: number;
  public dtCadastro!: string;
}

AdminLink.init({
  idVinculo: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  idAdministrador: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  dtCadastro: { type: DataTypes.STRING(10), allowNull: false }
}, {
  sequelize,
  tableName: "AdmVinculo",
  modelName: "adminLinks",
  timestamps: false
});

export default AdminLink;
