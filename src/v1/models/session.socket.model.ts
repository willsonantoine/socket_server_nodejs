import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";
import UsersModel from "./users.model";

export interface ISessionSocketModel {
  id?: string;
  reference?: string;
  UserId?: string;
  ip?: string;
}

class SessionSocket
  extends Model<ISessionSocketModel>
  implements ISessionSocketModel
{
  public id!: string;
  public reference?: string;
  public ip?: string;
}

SessionSocket.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "session_socket", sequelize, paranoid: true },
);
SessionSocket.belongsTo(UsersModel, { as: "user", foreignKey: "UserId" });

export default SessionSocket;
