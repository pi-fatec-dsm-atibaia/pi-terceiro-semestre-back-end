import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface PasswordResetAttributes {
    id?: number;
    email: string;
    token: string;
    expiresAt: Date;
}

class PasswordReset extends Model<PasswordResetAttributes> implements PasswordResetAttributes {
    id!: number;
    email!: string;
    token!: string;
    expiresAt!: Date;
}

PasswordReset.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false},
    token: { type: DataTypes.STRING, allowNull: false},
    expiresAt: {type: DataTypes.DATE, allowNull: false}
}, {
    sequelize,
    tableName: "PasswordReset",
    timestamps: false
});

export default PasswordReset;