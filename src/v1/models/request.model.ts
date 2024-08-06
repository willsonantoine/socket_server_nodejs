import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";
import UsersModel from "./users.model";

export interface IRequestModel {
  id?: string;
  reference?: string;
  UserId?: string;
  message?: string;
}

class RequestModel extends Model<IRequestModel> implements IRequestModel {
  public id!: string;
  public reference?: string;
  public message?: string;
}

RequestModel.init(
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
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "request", sequelize, paranoid: true },
);
RequestModel.belongsTo(UsersModel, { as: "user", foreignKey: "UserId" });

export default RequestModel;
