import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface DocumentoAttributes {
  id?: number;
  tipoArquivo: string;
  arquivo: string;
}

class Document extends Model<DocumentoAttributes> implements DocumentoAttributes {
  public id!: number;
  public tipoArquivo!: string;
  public arquivo!: string;
}

Document.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipoArquivo: { type: DataTypes.STRING(50), allowNull: false },
  arquivo: { type: DataTypes.STRING(50), allowNull: false }
}, {
  sequelize,
  tableName: "Documento",
  modelName: "documents",
  timestamps: false
});

export default Document;
