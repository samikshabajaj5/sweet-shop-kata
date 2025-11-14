import { DataTypes, Model } from "sequelize";
import db from "../utils/db";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // NEW → default user role
    },
  },
  {
    sequelize: db,
    modelName: "User",
  },
);

export default User;
