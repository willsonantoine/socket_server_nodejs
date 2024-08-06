import { DataTypes, Model } from "sequelize";
import sequelize from "../../utils/sequelize";

export interface IUserModel {
  id?: string;
  name?: string;
  password?: string;
  isActive?: boolean;
  sessionId?: string;
  token: string;
}

class UsersModel extends Model<IUserModel> implements IUserModel {
  public id!: string;
  public name!: string;
  public token!: string;
  public sessionId!: string;
  public password!: string;
  public isActive!: boolean | undefined;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4(),
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "Inconnue",
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    sessionId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "users", sequelize, paranoid: true },
);

export default UsersModel;
