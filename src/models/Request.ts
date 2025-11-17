import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface SolicitacaoAttributes {
  id?: number;
  idEquivalencia: number;
  protocolo?: string;
  dtSolicitacao: string;
  statusSolicitacao: string;
  observacao?: string;
  funcao?: string;
  departamento?: string;
  periodoTrabalho?: string;
  idAluno: number;
}

class Request extends Model<SolicitacaoAttributes> implements SolicitacaoAttributes {
  public id!: number;
  public idEquivalencia!: number;
  public protocolo?: string;
  public dtSolicitacao!: string;
  public statusSolicitacao!: string;
  public observacao?: string;
  public funcao?: string;
  public departamento?: string;
  public periodoTrabalho?: string;
  public idAluno!: number;
}

Request.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  idEquivalencia: { type: DataTypes.INTEGER, allowNull: false },
  protocolo: { type: DataTypes.STRING(50) },
  dtSolicitacao: { type: DataTypes.STRING(10), allowNull: false },
  statusSolicitacao: { type: DataTypes.STRING(50), allowNull: false },
  observacao: { type: DataTypes.TEXT },
  funcao: { type: DataTypes.STRING(100) },
  departamento: { type: DataTypes.STRING(100) },
  periodoTrabalho: { type: DataTypes.STRING(100) },
  idAluno: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: "Solicitacao",
  modelName: "requests",
  timestamps: false
});

export default Request;
