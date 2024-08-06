import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";
import UsersModel from "./users.model";
import RequestModel from "./request.model";

export interface IChatModel {
  id?: string;
  UserIdFrom?: string;
  UserIdTo?: string;
  message?: string;
  requestId?: string;
}

class ChatModel extends Model<IChatModel> implements IChatModel {
  public id!: string;
  public UserIdFrom?: string;
  public UserIdTo?: string;
  public message?: string;
  public requestId?: string;
}

ChatModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "chat", sequelize, paranoid: true },
);
ChatModel.belongsTo(UsersModel, { as: "user_from", foreignKey: "UserIdFrom" });
ChatModel.belongsTo(UsersModel, { as: "user_to", foreignKey: "UserIdTo" });
ChatModel.belongsTo(RequestModel, { as: "req", foreignKey: "requestId" });

export default ChatModel;
